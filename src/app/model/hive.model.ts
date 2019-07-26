import {Hivecard} from './hive-card.model';

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
    location: any;

    constructor(id?: string, hivecards?: Hivecard[], creationDate?: string, name?: string, queenColor?: string, race?: string, beehiveKind?: string,
                members?: string[], adminId?: string, state?: string) {
        this.id = id;
        this.creationDate = creationDate;
        this.name = name;
        this.queenColor = queenColor;
        this.race = race;
        this.beehiveKind = beehiveKind;
        this.hivecards = hivecards;
        this.members = members;
        this.adminId = adminId
        this.state = state;
    }
}
