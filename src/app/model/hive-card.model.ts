export class Hivecard {

    id: string;
    hiveId: string;
    creationDate: string;
    broodStadium: string;
    gentleness: number;
    swarmBehavior: number;
    queenSeen: boolean;
    peculiarity: string;
    comment: string;
    hiveName: string;
    creator: string;


    constructor(hivecardId?: string, hiveId?: string, creationDate?: string, broodStadium?: string,
                 gentleness?: number, swarmBehavior?: number, queenSeen?: boolean,
                 peculiarity?: string, comment?: string, hiveName?: string,
                 creator?: string) {
       this.hiveId = hiveId;
       this.creationDate = creationDate;
       this.broodStadium = broodStadium;
       this.gentleness = gentleness;
       this.swarmBehavior = swarmBehavior;
       this.queenSeen = queenSeen;
       this.peculiarity = peculiarity;
       this.comment = comment;
       this.hiveName = hiveName;
       this.creator = creator;
    }
}
