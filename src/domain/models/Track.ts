export interface TrackInfo {
  title: string;
  artistName: string;
}

export interface Track extends TrackInfo{
  url: string;
}