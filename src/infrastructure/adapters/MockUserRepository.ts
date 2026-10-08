import { injectable } from "tsyringe";
import { IUserRepository } from "../../application/ports/outbound/UserRepositoryPort";
import User from "../../domain/models/User";
import UserPreferences from "../../domain/models/UserPreferences";
import { Day } from "../../domain/models/Day";
import { Weather } from "../../domain/models/Weather";
import { Preferences } from "../../domain/models/Preferences";
import { TrackInfo } from "../../domain/models/Track";

@injectable()
export class MockUserRepositoryAdapter implements IUserRepository {
    private users: Map<string, User> = new Map();

    constructor() {
        this.initMockData();
    }

    private buildKey(day: Day, weather: Weather): string {
        return `${day}_${weather}`;
    }

    private initMockData(): void {
        const days: Day[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        const weathers: Weather[] = ["SOLEIL", "PLUIE", "NEIGE", "NUAGEUX"];
        const alicePreferences: Preferences= new Map();
        const aliceTracks: Record<Weather, TrackInfo[]> = {
        SOLEIL: [
            { title: "Get Lucky", artistName: "Daft Punk" },
            { title: "Happy", artistName: "Pharrell Williams" },
            { title: "Walking on Sunshine", artistName: "Katrina and the Waves" },
            { title: "Sun Is Shining", artistName: "Bob Marley" },
            { title: "Uptown Funk", artistName: "Bruno Mars" },
            { title: "Good Vibrations", artistName: "The Beach Boys" },
            { title: "Sunday Morning", artistName: "Maroon 5" },
        ],
        PLUIE: [
            { title: "Singing in the Rain", artistName: "Gene Kelly" },
            { title: "Set Fire to the Rain", artistName: "Adele" },
            { title: "Umbrella", artistName: "Rihanna" },
            { title: "Purple Rain", artistName: "Prince" },
            { title: "Raindrops Keep Fallin'", artistName: "B.J. Thomas" },
            { title: "Have You Ever Seen the Rain", artistName: "CCR" },
            { title: "Riders on the Storm", artistName: "The Doors" },
        ],
        NEIGE: [
            { title: "Christmas Lights", artistName: "Coldplay" },
            { title: "Let It Snow", artistName: "Frank Sinatra" },
            { title: "Winter Winds", artistName: "Mumford & Sons" },
            { title: "Snow", artistName: "Red Hot Chili Peppers" },
            { title: "Frozen", artistName: "Madonna" },
            { title: "Ice Ice Baby", artistName: "Vanilla Ice" },
            { title: "Wintertime", artistName: "Norah Jones" },
        ],
        NUAGEUX: [
            { title: "The Sound of Silence", artistName: "Simon & Garfunkel" },
            { title: "Cloudy Day", artistName: "Tones and I" },
            { title: "A Sky Full of Stars", artistName: "Coldplay" },
            { title: "Boulevard of Broken Dreams", artistName: "Green Day" },
            { title: "Fast Car", artistName: "Tracy Chapman" },
            { title: "Weather With You", artistName: "Crowded House" },
            { title: "Lazy Sunday", artistName: "Small Faces" },
        ],
        };

        days.forEach((day, index) => {
        weathers.forEach((weather) => {
            alicePreferences.set(`${day}_${weather}`, aliceTracks[weather][index]);
        });
        });

        this.users.set("user-1", {
        id: "user-1",
        preferredChannel: "EMAIL",
        preferences: alicePreferences,
        fallbackTrack: { title: "Bohemian Rhapsody", artistName: "Queen" },
        });

        const bobPreferences: Preferences = new Map();
        const bobTracks: Record<Weather, TrackInfo[]> = {
        SOLEIL: [
            { title: "Here Comes the Sun", artistName: "The Beatles" },
            { title: "Blinding Lights", artistName: "The Weeknd" },
            { title: "Sweet Child O' Mine", artistName: "Guns N' Roses" },
            { title: "Paradise City", artistName: "Guns N' Roses" },
            { title: "Back in Black", artistName: "AC/DC" },
            { title: "Don't Stop Me Now", artistName: "Queen" },
            { title: "Feelin' Stronger Every Day", artistName: "Chicago" },
        ],
        PLUIE: [
            { title: "November Rain", artistName: "Guns N' Roses" },
            { title: "Riders on the Storm", artistName: "The Doors" },
            { title: "No Rain", artistName: "Blind Melon" },
            { title: "Black Hole Sun", artistName: "Soundgarden" },
            { title: "Stan", artistName: "Eminem" },
            { title: "Crying in the Rain", artistName: "A-ha" },
            { title: "I Can't Stand the Rain", artistName: "Ann Peebles" },
        ],
        NEIGE: [
            { title: "Hazy Shade of Winter", artistName: "The Bangles" },
            { title: "Immortal", artistName: "Evanescence" },
            { title: "Colder Weather", artistName: "Zac Brown Band" },
            { title: "Snowblind", artistName: "Black Sabbath" },
            { title: "A Winter's Tale", artistName: "Queen" },
            { title: "Ice Queen", artistName: "Within Temptation" },
            { title: "Cold As Ice", artistName: "Foreigner" },
        ],
        NUAGEUX: [
            { title: "Behind Blue Eyes", artistName: "The Who" },
            { title: "Losing My Religion", artistName: "R.E.M." },
            { title: "Wonderwall", artistName: "Oasis" },
            { title: "Creep", artistName: "Radiohead" },
            { title: "Stairway to Heaven", artistName: "Led Zeppelin" },
            { title: "Californication", artistName: "Red Hot Chili Peppers" },
            { title: "Wish You Were Here", artistName: "Pink Floyd" },
        ],
        };

        days.forEach((day, index) => {
        weathers.forEach((weather) => {
            bobPreferences.set(`${day}_${weather}`, bobTracks[weather][index]);
        });
        });

        this.users.set("user-2", {
        id: "user-2",
        preferredChannel: "SMS",
        preferences: bobPreferences,
        fallbackTrack: { title: "Hotel California", artistName: "Eagles" },
        });
    }

    async find(userId: string, day: Day, weather: Weather): Promise<UserPreferences> {
        const user = this.users.get(userId);

        if (!user) {
            throw new Error(`User ${userId} not found`);
        }

        const key = this.buildKey(day, weather);
        const track = user.preferences.get(key);

        if(!track){
            throw new Error("User preference should not be null");
        }

        return {
            track,
            fallbackTrack: user.fallbackTrack,
            preferredChannel: user.preferredChannel,
        };
    }
}