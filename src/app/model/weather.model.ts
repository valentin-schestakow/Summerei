import {Forecast} from './forecast';

export class Weather {

    hiveId: string;
    lastModified: string;
    forecast: Forecast[];



    constructor(hiveId?: string, lastModified?: string, forecast?: Forecast[]) {
        this.hiveId = hiveId;
        this.lastModified = lastModified;
        this.forecast = forecast;
    }
}
