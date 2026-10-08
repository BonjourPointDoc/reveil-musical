import { NotificationType } from "./NotificationType";
import { Preferences } from "./Preferences";
import { TrackInfo } from "./Track";

export default interface User {
  id: string;
  preferredChannel: NotificationType;
  preferences: Preferences;
  fallbackTrack: TrackInfo;
}
