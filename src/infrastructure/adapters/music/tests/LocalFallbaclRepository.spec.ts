import "reflect-metadata"
import { LocalFallbackRepositoryAdapter } from "../LocalFallbackRepository";

describe("LocalFallbackRepositoryAdapter", () => {
    let adapter: LocalFallbackRepositoryAdapter;

    beforeEach(() => {
        adapter = new LocalFallbackRepositoryAdapter();
    });

    it("Trouve un morceau correspondant au titre ou à l'artiste", async () => {
        const result = await adapter.find("debussy");
        expect(result.artistName).toContain("Debussy");
    });

    it("Renvoie le premier morceau par défaut si aucun n'est trouvé", async () => {
        const result = await adapter.find("aaaaaaaaaa");
        expect(result).toBeDefined();
        expect(result.title).toBe("Clair de Lune");
    });
});