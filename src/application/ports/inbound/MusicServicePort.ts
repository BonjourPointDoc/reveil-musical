import {  Track, TrackInfo } from "../../../domain/models/Track";

export interface IMusicService {
    get(track: TrackInfo, fallback: TrackInfo): Promise<Track>;
    buildQuery(track: TrackInfo): string;
}
