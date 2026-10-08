import { injectable } from "tsyringe";
import { IMusicRepository } from "../../../application/ports/outbound/MusicRepositoryPort";
import { Track } from "../../../domain/models/Track";

@injectable()
export class ItunesRepositoryAdapter implements IMusicRepository {
    async find(query: string): Promise<Track | null> {   
       const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP iTunes : ${response.status}`);
        }

        const data = await response.json();
        return (data.results || []).map((item: any) => ({
            title: item.trackName,
            artistName: item.artistName,
            url: item.trackViewUrl || item.previewUrl
        }));
    }
}