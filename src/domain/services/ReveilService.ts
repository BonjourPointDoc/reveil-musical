import { inject, injectable } from "tsyringe";
import { IMusicService } from "../../application/ports/inbound/MusicServicePort";
import { IUserService } from "../../application/ports/inbound/UserServicePort";
import { INotificationService } from "../../application/ports/inbound/NotificationServicePort";
import { Day } from "../models/Day";
import { Weather } from "../models/Weather";
import { IReveilService } from "../../application/ports/inbound/ReveilServicePort";

@injectable()
export class ReveilService implements IReveilService {
    constructor(
        @inject("UserService") private userService: IUserService,
        @inject("MusicService") private musicService: IMusicService,
        @inject("NotificationService") private notifService: INotificationService
    ) {}

    async sendUserAlarm(userId: string, day: Day, weather: Weather): Promise<void> {
        const userPreferences = await this.userService.get(userId, day, weather);
        const trackData = await this.musicService.get(userPreferences.track, userPreferences.fallbackTrack);
        this.notifService.sendNotification(trackData, userPreferences.preferredChannel);
    }
}