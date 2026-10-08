import { NotificationType } from "./NotificationType";
import { TrackInfo } from "./Track";

export default interface UserPreferences {
  track: TrackInfo; 
  fallbackTrack: TrackInfo;
  preferredChannel: NotificationType;
}