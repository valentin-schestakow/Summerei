import {Hivecard} from './hive-card.model';
import {Weather} from './weather.model';
import {FirestoreWeather} from './firestore-weather.model';

export class Hive {
    /**
     * self explanatory
     */
    id: string;
    /**
     * self explanatory
     */
    creationDate: string;
    /**
     * self explanatory
     */
    name: string;
    /**
     * self explanatory
     */
    queenColor: string;
    /**
     * race of the hive
     */
    race: string;
    /**
     * self explanatory
     */
    beehiveKind: string;
    /**
     * a list of all hivecards related to this hive
     */
    hivecards : Hivecard[];
    /**
     * list of the member ids (firebase ids)
     */
    members: string[];
    /**
     * self explanatory
     */
    memberNames: string[];
    /**
     * self explanatory
     */
    adminId: string;
    /**
     * self explanatory
     */
    adminName: string;
    /**
     * can be good, mediocre, bad. short overview of a hives state
     */
    state: string;
    /**
     * self explanatory
     */
    location: FirestoreWeather;
    /**
     * OneSignal Notifications ids of all members
     */
    pushIds: string[];

    /**
     * constructor self explanatory
     *
     * @param id
     * @param name
     * @param hivecards
     * @param creationDate
     * @param queenColor
     * @param race
     * @param beehiveKind
     * @param members
     * @param adminId
     * @param state
     * @param location
     * @param pushIds
     * @param memberNames
     * @param adminName
     */
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
