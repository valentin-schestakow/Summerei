export class Forecast {

    minTemp: string;
    maxTemp: string;
    averageTemp: string;
    date: string;
    description: string;
    icon: string;

    constructor(minTemp?: string, maxTemp?: string, averageTemp?: string, date?: string, description?: string, icon?: string) {
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.averageTemp = averageTemp;
        this.date = date;
        this.description = description;
        this.icon = icon;
    }
}
