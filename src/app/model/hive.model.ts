import {HiveCard} from './hive-card.model';

export class Hive {
    id: number;
    creationDate: string;
    name: string;
    queenColor: string;
    race: string;
    beehiveKind: string;
    hiveCards : HiveCard[];
    members: string[];
    adminId: string;



    constructor(id?: number, hiveCards?: HiveCard[], creationDate?: string, name?: string, queenColor?: string, race?: string, beehiveKind?: string,
                members?: string[], adminId?: string) {
        this.id = id;
        this.creationDate = creationDate;
        this.name = name;
        this.queenColor = queenColor;
        this.race = race;
        this.beehiveKind = beehiveKind;
        this.hiveCards = hiveCards;
        this.members = members;
        this.adminId = adminId
    }
}
