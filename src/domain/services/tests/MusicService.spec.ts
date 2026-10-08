import "reflect-metadata"
import { MusicService } from "../MusicService";
import { IMusicRepository } from "../../../application/ports/outbound/MusicRepositoryPort";
import { Track, TrackInfo } from "../../models/Track";

describe("MusicService", () => {
    let service: MusicService;
    let mockMusicRepo: jest.Mocked<IMusicRepository>;
    let mockFallbackRepo: jest.Mocked<IMusicRepository>;

    const sampleTrackInfo: TrackInfo = { title: "Get Lucky", artistName: "Daft Punk" };
    const fallbackTrackInfo: TrackInfo = { title: "Clair de Lune", artistName: "Debussy" };

    const resolvedTrack: Track = { ...sampleTrackInfo, url: "https://music.com/track/1" };
    const fallbackResolvedTrack: Track = { ...fallbackTrackInfo, url: "https://local.audio/fallback.mp3" };

    beforeEach(() => {
        mockMusicRepo = { find: jest.fn() };
        mockFallbackRepo = { find: jest.fn() };

        service = new MusicService(mockMusicRepo, mockFallbackRepo);
    });

    it("Retourne le morceau du repo principal s'il est trouvé", async () => {
        mockMusicRepo.find.mockResolvedValue(resolvedTrack);

        const result = await service.get(sampleTrackInfo, fallbackTrackInfo);

        expect(result).toEqual(resolvedTrack);
        expect(mockMusicRepo.find).toHaveBeenCalledWith("Get Lucky Daft Punk");
        expect(mockFallbackRepo.find).not.toHaveBeenCalled();
    });

    it("Utilisation du fallback si le repo principal renvoie null", async () => {
        mockMusicRepo.find.mockResolvedValue(null);
        mockFallbackRepo.find.mockResolvedValue(fallbackResolvedTrack);

        const result = await service.get(sampleTrackInfo, fallbackTrackInfo);

        expect(result).toEqual(fallbackResolvedTrack);
        expect(mockFallbackRepo.find).toHaveBeenCalledWith("Clair de Lune Debussy");
    });

    it("Utilisation du fallback si le repo principal ne fonctionne pas", async () => {
        mockMusicRepo.find.mockRejectedValue(new Error("HTTP 503 Service Unavailable"));
        mockFallbackRepo.find.mockResolvedValue(fallbackResolvedTrack);

        const result = await service.get(sampleTrackInfo, fallbackTrackInfo);

        expect(result).toEqual(fallbackResolvedTrack);
        expect(mockFallbackRepo.find).toHaveBeenCalled();
    });
});