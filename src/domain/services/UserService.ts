import { inject, injectable } from "tsyringe";
import { IUserService } from "../../application/ports/inbound/UserServicePort";
import { IUserRepository } from "../../application/ports/outbound/UserRepositoryPort";
import { Day } from "../models/Day";
import UserPreferences from "../models/UserPreferences";
import { Weather } from "../models/Weather";

@injectable()
export class UserService implements IUserService {
    constructor(@inject("UserRepository") private userRepo: IUserRepository) {}

    get(userId: string, day: Day, weather: Weather): Promise<UserPreferences> { 
        return this.userRepo.find(userId, day, weather);
    }
}