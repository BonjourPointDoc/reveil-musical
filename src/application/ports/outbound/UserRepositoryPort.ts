import { Day } from "../../../domain/models/Day";
import UserPreferences from "../../../domain/models/UserPreferences";
import { Weather } from "../../../domain/models/Weather";

export interface IUserRepository {
  get(userId: string, day: Day, weather: Weather): Promise<UserPreferences>;
}