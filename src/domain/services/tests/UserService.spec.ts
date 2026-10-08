import "reflect-metadata"
import { UserService } from "../UserService";
import { IUserRepository } from "../../../application/ports/outbound/UserRepositoryPort";
import UserPreferences from "../../models/UserPreferences";
import { Day } from "../../models/Day";
import { Weather } from "../../models/Weather";

describe("UserService", () => {
    let service: UserService;
    let mockUserRepo: jest.Mocked<IUserRepository>;

    const mockUserPreferences: UserPreferences = {
        track: { title: "Get Lucky", artistName: "Daft Punk" },
        fallbackTrack: { title: "Bohemian Rhapsody", artistName: "Queen" },
        preferredChannel: "EMAIL",
    };

    beforeEach(() => {
        mockUserRepo = {
            find: jest.fn(),
        } as unknown as jest.Mocked<IUserRepository>;
        service = new UserService(mockUserRepo);
    });

    it("Retourne les préférences utilisateur depuis le repo", async () => {
        mockUserRepo.find.mockResolvedValue(mockUserPreferences);

        const userId = "user-1";
        const day: Day = "MONDAY";
        const weather: Weather = "SOLEIL";

        const result = await service.get(userId, day, weather);

        expect(result).toEqual(mockUserPreferences);
        expect(mockUserRepo.find).toHaveBeenCalledWith(userId, day, weather);
        expect(mockUserRepo.find).toHaveBeenCalledTimes(1);
    });

    it("Throw une erreur si le repo ne trouve pas l'utilisateur", async () => {
        mockUserRepo.find.mockRejectedValue(new Error("Utilisateur introuvable"));
        await expect(service.get("user-3", "MONDAY", "SOLEIL"))
            .rejects
            .toThrow("Utilisateur introuvable");

        expect(mockUserRepo.find).toHaveBeenCalledWith("user-3", "MONDAY", "SOLEIL");
    });
});