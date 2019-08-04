
/**
 * Model of the possible settings
 */
export class Settings {

    /**
     * allow notification or not
     */
    hivecardNotification: boolean;

    /**
     * can be listView or slideView
     * used to distinguish which kind of view will be rendered
     */
    viewKind: string;


    /**
     * self explanatory
     *
      *@param viewKind
     * @param hivecardNotification
     */
    constructor(viewKind?: string, hivecardNotification?: boolean) {
        this.viewKind = viewKind;
        this.hivecardNotification = hivecardNotification;

    }
}
