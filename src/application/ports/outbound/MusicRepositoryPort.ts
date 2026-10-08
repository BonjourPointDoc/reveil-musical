import { Track } from "../../../domain/models/Track";

export interface IMusicRepository {
    find(query:string): Promise<Track | null>;
}