import { INotificationRepository } from "../../../application/ports/outbound/NotificationRepositoryPort";
import { Track } from "../../../domain/models/Track";

export class PushRepositoryAdapter implements INotificationRepository {

  async send(data: Track): Promise<any> {
    console.log(`[NOTIFICATION PUSH] Titre : ${data.title}, Artiste : ${data.artistName}, Lien : ${data.url}`);
  }
}