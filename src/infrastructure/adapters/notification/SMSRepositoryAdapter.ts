import { INotificationRepository } from "../../../application/ports/outbound/NotificationRepositoryPort";
import { Track } from "../../../domain/models/Track";

export class SMShRepositoryAdapter implements INotificationRepository {

  async send(data: Track): Promise<any> {
    console.log(`[SMS] Titre : ${data.title}, Artiste : ${data.artistName}, Lien : ${data.url}`);
  }
}