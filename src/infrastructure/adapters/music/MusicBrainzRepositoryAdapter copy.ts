import { injectable } from "tsyringe";
import { IMusicRepository } from "../../../application/ports/outbound/MusicRepositoryPort";
import { Track } from "../../../domain/models/Track";

@injectable()
export class MusicBrainsRepositoryAdapter implements IMusicRepository {
    async find(query: string): Promise<Track | null> {   
        const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(query)}&fmt=json`;
        const response = await fetch(url, {
            headers: {
            "User-Agent": "ReveilMusical/1.0.0 ( contact@reveilmusical.com )",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP MusicBrainz : ${response.status}`);
        }

        const data = await response.json();

        return (data.recordings || []).map((item: any) => ({
            title: item.title,
            artistName: item["artist-credit"]?.[0]?.name ?? "Artiste inconnu",
            url: item.id ? `https://musicbrainz.org/recording/${item.id}` : undefined
        }));
    }
}