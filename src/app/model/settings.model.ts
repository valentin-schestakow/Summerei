
export class Settings {

    hivecardNotification: boolean;
    weatherNotification: boolean;
    viewKind: string;


    constructor(viewKind?: string, hivecardNotification?: boolean, weatherNotification?: boolean) {
        this.viewKind = viewKind;
        this.hivecardNotification = hivecardNotification;
        this.weatherNotification = weatherNotification;
    }
}
