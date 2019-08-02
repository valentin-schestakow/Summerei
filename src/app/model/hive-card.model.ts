/**
 * Model of a hivecard
 */
export class Hivecard {

    /**
     * self explanatory
     */
    id: string;
    /**
     * self explanatory
     */
    hiveId: string;
    /**
     * self explanatory
     */
    creationDate: string;
    /**
     * can be 1,2,3 state wihich relates to hive current situation
     */
    broodStatus: string[];
    /**
     * number from 0-6, from worst to best.
     */
    gentleness: number;
    /**
     * number from 0-6, from worst to best.
     */
    swarmBehavior: number;
    /**
     * self explanatory
     */
    queenSeen: boolean;
    /**
     * self explanatory
     */
    peculiarity: string;
    /**
     * self explanatory
     */
    comment: string;
    /**
     * self explanatory
     */
    hiveName: string;
    /**
     * self explanatory
     */
    creator: string;
    /**
     * information for beekeeper weekly workflow
     */
    frameChange: string[];
    /**
     * self explanatory
     */
    hiveState: string;


    /**
     * constructor (self explanatory)
     *
     * @param hivecardId
     * @param hiveId
     * @param creationDate
     * @param broodStatus
     * @param gentleness
     * @param swarmBehavior
     * @param queenSeen
     * @param peculiarity
     * @param comment
     * @param hiveName
     * @param creator
     * @param frameChange
     */
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
