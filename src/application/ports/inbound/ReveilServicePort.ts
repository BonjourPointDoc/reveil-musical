import { Day } from "../../../domain/models/Day";
import { Weather } from "../../../domain/models/Weather";

export interface IReveilService {
    sendUserAlarm(userId: string, day: Day, weather: Weather): Promise<void> 
}