import "reflect-metadata"
import { NotificationService } from "../NotificationService";
import { INotificationRepository } from "../../../application/ports/outbound/NotificationRepositoryPort";
import { Track } from "../../models/Track";

describe("NotificationService", () => {
    let service: NotificationService;
    let mockPushRepo: jest.Mocked<INotificationRepository>;
    let mockSmsRepo: jest.Mocked<INotificationRepository>;
    let mockEmailRepo: jest.Mocked<INotificationRepository>;

    const sampleTrack: Track = {
        title: "Clair de Lune",
        artistName: "Claude Debussy",
        url: "https://local.audio/fallback/clair-de-lune.mp3"
    };

    beforeEach(() => {
        mockPushRepo = { send: jest.fn() };
        mockSmsRepo = { send: jest.fn() };
        mockEmailRepo = { send: jest.fn() };
        service = new NotificationService(mockPushRepo, mockSmsRepo, mockEmailRepo);
    });

    it("Envoie un email lorsque le type est EMAIL", () => {
        service.sendNotification(sampleTrack, "EMAIL");

        expect(mockEmailRepo.send).toHaveBeenCalledWith(sampleTrack);
        expect(mockEmailRepo.send).toHaveBeenCalledTimes(1);
        expect(mockSmsRepo.send).not.toHaveBeenCalled();
        expect(mockPushRepo.send).not.toHaveBeenCalled();
    });

    it("Envoie un SMS lorsque le type est SMS", () => {
        service.sendNotification(sampleTrack, "SMS");

        expect(mockSmsRepo.send).toHaveBeenCalledWith(sampleTrack);
        expect(mockSmsRepo.send).toHaveBeenCalledTimes(1);
        expect(mockEmailRepo.send).not.toHaveBeenCalled();
        expect(mockPushRepo.send).not.toHaveBeenCalled();
    });

    it("Envoie une notification PUSH par défaut ou lorsque le type est PUSH", () => {
        service.sendNotification(sampleTrack, "PUSH");

        expect(mockPushRepo.send).toHaveBeenCalledWith(sampleTrack);
        expect(mockPushRepo.send).toHaveBeenCalledTimes(1);
        expect(mockEmailRepo.send).not.toHaveBeenCalled();
        expect(mockSmsRepo.send).not.toHaveBeenCalled();
    });
});