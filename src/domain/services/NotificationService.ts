import { inject, injectable } from "tsyringe";
import { INotificationService } from "../../application/ports/inbound/NotificationServicePort";
import { INotificationRepository } from "../../application/ports/outbound/NotificationRepositoryPort";
import { Track, TrackInfo } from "../models/Track";
import { NotificationType } from "../models/NotificationType";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject("PushRepository") private pushRepo: INotificationRepository,
        @inject("SMSRepository") private smsRepo: INotificationRepository,
        @inject("EmailRepository") private emailRepo: INotificationRepository,
    ) {}

    sendNotification(data: Track, type: NotificationType) {
        switch(type){
            case "EMAIL":
                this.emailRepo.send(data);
                break;
            case "SMS":
                this.smsRepo.send(data);
                break;
            default:
                this.pushRepo.send(data);
                break;
        }
    }

}