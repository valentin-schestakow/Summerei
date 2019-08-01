import {Hivecard} from './hive-card.model';
import {Weather} from './weather.model';
import {FirestoreWeather} from './firestore-weather.model';

export class Hive {
     id: string;
    creationDate: string;
    name: string;
    queenColor: string;
    race: string;
    beehiveKind: string;
    hivecards : Hivecard[];
    members: string[];
    memberNames: string[];
    adminId: string;
    adminName: string;
    state: string;
    location: FirestoreWeather;
    pushIds: string[];

    constructor(id?: string, name?: string, hivecards?: Hivecard[], creationDate?: string, queenColor?: string, race?: string, beehiveKind?: string,
                members?: string[], adminId?: string, state?: string, location?: FirestoreWeather, pushIds?: string[], memberNames?: string[], adminName?: string) {
        this.id = id;
        this.creationDate = creationDate;
        this.name = name;
        this.queenColor = queenColor;
        this.race = race;
        this.beehiveKind = beehiveKind;
        this.hivecards = hivecards;
        this.members = members;
        this.adminId = adminId;
        this.state = state;
    }
}
