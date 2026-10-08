import { injectable } from "tsyringe";
import { IMusicRepository } from "../../../application/ports/outbound/MusicRepositoryPort";
import {Track} from "../../../domain/models/Track";


@injectable()
export class LocalFallbackRepositoryAdapter implements IMusicRepository {

    private LOCAL_FALLBACK_TRACKS: Track[] = [
        { title: "Clair de Lune", artistName: "Claude Debussy", url: "https://local.audio/fallback/clair-de-lune.mp3" },
        { title: "Symphonie n° 5", artistName: "Ludwig van Beethoven", url: "https://local.audio/fallback/symphonie-5.mp3" },
        { title: "Les Quatre Saisons - Le Printemps", artistName: "Antonio Vivaldi", url: "https://local.audio/fallback/printemps.mp3" },
        { title: "Gymnopédie n° 1", artistName: "Erik Satie", url: "https://local.audio/fallback/gymnopedie-1.mp3" },
    ]

    find(query: string): Promise<Track> {
        const normalizedQuery = query.toLowerCase().trim();

        const match = this.LOCAL_FALLBACK_TRACKS.find(
            (track) =>
                track.title.toLowerCase().includes(normalizedQuery) ||
                track.artistName.toLowerCase().includes(normalizedQuery)
        );

        return match ?? this.LOCAL_FALLBACK_TRACKS[0];
    }
}