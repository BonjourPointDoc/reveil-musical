import "reflect-metadata"
import { ReveilService } from "../ReveilService";
import { IUserService } from "../../../application/ports/inbound/UserServicePort";
import { IMusicService } from "../../../application/ports/inbound/MusicServicePort";
import { INotificationService } from "../../../application/ports/inbound/NotificationServicePort";
import { Track, TrackInfo } from "../../models/Track";
import { Day } from "../../models/Day";
import { Weather } from "../../models/Weather";

describe("ReveilService", () => {
    let service: ReveilService;
    let mockUserService: jest.Mocked<IUserService>;
    let mockMusicService: jest.Mocked<IMusicService>;
    let mockNotifService: jest.Mocked<INotificationService>;

    const sampleTrackInfo: TrackInfo = { title: "Get Lucky", artistName: "Daft Punk" };
    const fallbackTrackInfo: TrackInfo = { title: "Bohemian Rhapsody", artistName: "Queen" };
    
    const resolvedTrack: Track = {
        title: "Get Lucky",
        artistName: "Daft Punk",
        url: "https://music.apple.com/track/12345"
    };

    const mockUserPreferences = {
        track: sampleTrackInfo,
        fallbackTrack: fallbackTrackInfo,
        preferredChannel: "EMAIL" as const
    };

    beforeEach(() => {
        mockUserService = { get: jest.fn() };
        mockMusicService = { get: jest.fn(), buildQuery: jest.fn() };
        mockNotifService = { sendNotification: jest.fn() };
        service = new ReveilService(mockUserService, mockMusicService, mockNotifService);
    });

    it("devrait orchestrer correctement la recherche de l'utilisateur, la musique et l'envoi de la notification", async () => {
        mockUserService.get.mockResolvedValue(mockUserPreferences);
        mockMusicService.get.mockResolvedValue(resolvedTrack);

        const userId = "user-1";
        const day: Day = "MONDAY";
        const weather: Weather = "SOLEIL";

        await service.sendUserAlarm(userId, day, weather);
        expect(mockUserService.get).toHaveBeenCalledWith(userId, day, weather);
        expect(mockUserService.get).toHaveBeenCalledTimes(1);
        expect(mockMusicService.get).toHaveBeenCalledWith(
            mockUserPreferences.track,
            mockUserPreferences.fallbackTrack
        );
        expect(mockMusicService.get).toHaveBeenCalledTimes(1);
        expect(mockNotifService.sendNotification).toHaveBeenCalledWith(
            resolvedTrack,
            mockUserPreferences.preferredChannel
        );
        expect(mockNotifService.sendNotification).toHaveBeenCalledTimes(1);
    });

    it("N'appelle pas la musique et la notification si l'utilisateur n'est pas trouvé", async () => {
        mockUserService.get.mockRejectedValue(new Error("Utilisateur introuvable"));

        await expect(service.sendUserAlarm("invalid-user", "MONDAY", "SOLEIL"))
            .rejects
            .toThrow("Utilisateur introuvable");

        expect(mockUserService.get).toHaveBeenCalledWith("invalid-user", "MONDAY", "SOLEIL");
        expect(mockMusicService.get).not.toHaveBeenCalled();
        expect(mockNotifService.sendNotification).not.toHaveBeenCalled();
    });
});