import { Track } from "../../../domain/models/Track";

export interface INotificationRepository {
    send(data: Track);
}
