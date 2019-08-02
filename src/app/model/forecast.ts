/**
 * Forecast Model
 */
export class Forecast {

    /**
     * self explanatory
     */
    minTemp: string;
    /**
     * self explanatory
     */
    maxTemp: string;
    /**
     * self explanatory
     */
    averageTemp: string;
    /**
     * self explanatory
     */
    date: string;
    /**
     * self explanatory
     */
    description: string;
    /**
     * icon code, which will be used to load an Icon from the assets folder
     */
    icon: string;

    /**
     * Constructor (self explanatory)
     *
     * @param minTemp
     * @param maxTemp
     * @param averageTemp
     * @param date
     * @param description
     * @param icon
     */
    constructor(minTemp?: string, maxTemp?: string, averageTemp?: string, date?: string, description?: string, icon?: string) {
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.averageTemp = averageTemp;
        this.date = date;
        this.description = description;
        this.icon = icon;
    }
}
