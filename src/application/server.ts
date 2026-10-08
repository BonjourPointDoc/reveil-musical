
import "reflect-metadata";
import express from 'express';
import { container } from "tsyringe";
import { ItunesRepositoryAdapter } from "../infrastructure/adapters/music/ItunesRepositoryAdapter";
import { MusicBrainsRepositoryAdapter } from "../infrastructure/adapters/music/MusicBrainzRepositoryAdapter copy";
import { ReveilController } from "../presentation/controllers/ReveilController";
import { ReveilService } from "../domain/services/ReveilService";
import { UserService } from "../domain/services/UserService";
import { MusicService } from "../domain/services/MusicService";
import { NotificationService } from "../domain/services/NotificationService";
import { MockUserRepositoryAdapter } from "../infrastructure/adapters/MockUserRepository";
import { SMShRepositoryAdapter } from "../infrastructure/adapters/notification/SMSRepositoryAdapter";
import { PushRepositoryAdapter } from "../infrastructure/adapters/notification/PushRepositoryAdapter";
import { EmailRepositoryAdapter } from "../infrastructure/adapters/notification/EmailRepositoryAdapter";
import { LocalFallbackRepositoryAdapter } from "../infrastructure/adapters/music/LocalFallbackRepository";
require('dotenv').config();

const app = express();
app.use(express.json());

const musicApi = process.env.MUSIC_API?.toUpperCase();

const baseMusicRepo = musicApi === "ITUNES"
  ? new ItunesRepositoryAdapter()
  : new MusicBrainsRepositoryAdapter();

container.registerInstance("MusicRepository", baseMusicRepo);

container.register("LocalFallbackRepository", { useClass: LocalFallbackRepositoryAdapter });

container.register("UserRepository", { useClass: MockUserRepositoryAdapter });
container.register("PushRepository", { useClass: PushRepositoryAdapter });
container.register("SMSRepository", { useClass: SMShRepositoryAdapter });
container.register("EmailRepository", { useClass: EmailRepositoryAdapter });

container.register("UserService", { useClass: UserService });
container.register("NotificationService", { useClass: NotificationService });
container.register("MusicService", { useClass: MusicService });
container.register("ReveilService", { useClass: ReveilService });

const reveilController = container.resolve(ReveilController);

reveilController.registerRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
