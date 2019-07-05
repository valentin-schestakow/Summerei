export class Hivecard {

    id: string;
    hiveId: string;
    creationDate: string;
    broodStatus: string[];
    gentleness: number;
    swarmBehavior: number;
    queenSeen: boolean;
    peculiarity: string;
    comment: string;
    hiveName: string;
    creator: string;
    frameChange: string[];
    hiveState: string;


    constructor(hivecardId?: string, hiveId?: string, creationDate?: string, broodStatus?: string[],
                 gentleness?: number, swarmBehavior?: number, queenSeen?: boolean,
                 peculiarity?: string, comment?: string, hiveName?: string,
                 creator?: string, frameChange?: string[]) {
       this.hiveId = hiveId;
       this.creationDate = creationDate;
       this.broodStatus = broodStatus;
       this.gentleness = gentleness;
       this.swarmBehavior = swarmBehavior;
       this.queenSeen = queenSeen;
       this.peculiarity = peculiarity;
       this.comment = comment;
       this.hiveName = hiveName;
       this.creator = creator;
       this.frameChange = frameChange;
    }
}
