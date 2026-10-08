import { inject, injectable } from "tsyringe";
import { IMusicService } from "../../application/ports/inbound/MusicServicePort";
import { IMusicRepository } from "../../application/ports/outbound/MusicRepositoryPort";
import { Track, TrackInfo } from "../models/Track";

@injectable()
export class MusicService implements IMusicService {
    constructor(
        @inject("MusicRepository") private musicRepo: IMusicRepository,
        @inject("LocalFallbackRepository") private fallbackRepo: IMusicRepository
    ) {}

    buildQuery(track: TrackInfo): string {
        if (!track.artistName) {
            return track.title.trim();
        }
        return `${track.title.trim()} ${track.artistName.trim()}`;
    }

    async get(track: TrackInfo, fallback: TrackInfo): Promise<Track> {
        try {
            const query = this.buildQuery(track);
            const music = await this.musicRepo.find(query);
            if (music) return music;
        } catch (error) {}

        const fallbackQuery = this.buildQuery(fallback);
        const fallbackMusic = await this.fallbackRepo.find(fallbackQuery);
        return fallbackMusic!;
    }
}