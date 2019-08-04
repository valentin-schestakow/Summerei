import {Forecast} from './forecast';


/**
 * Model of a weather-object
 */
export class Weather {

    /**
     * id of the hive to which this object relates to
     */
    hiveId: string;
    /**
     * self explanatory
     */
    lastModified: string;
    /**
     * self explanatory
     */
    forecast: Forecast[];


    /**
     * self explanatory
     *
     * @param hiveId
     * @param lastModified
     * @param forecast
     */
    constructor(hiveId?: string, lastModified?: string, forecast?: Forecast[]) {
        this.hiveId = hiveId;
        this.lastModified = lastModified;
        this.forecast = forecast;
    }
}
