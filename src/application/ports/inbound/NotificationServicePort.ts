import { NotificationType } from "../../../domain/models/NotificationType";
import { Track } from "../../../domain/models/Track";

export interface INotificationService {
    sendNotification(data: Track, type: NotificationType);
}
