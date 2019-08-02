/**
 * Model for location data of a hive
 */
export class FirestoreWeather {

    /**
     * name of the city
     */
    city: string;
    /**
     * postcode of the provided city
     */
    postalCode: string;

    /**
     * Constructor (self explanatory)
     *
     * @param city
     * @param postalCode
     */
    constructor(city?: string, postalCode?: string) {
        this.city = city;
        this.postalCode = postalCode;
    }
}
