export class FirestoreWeather {

    city: string;
    postalCode: string;

    constructor(city?: string, postalCode?: string) {
        this.city = city;
        this.postalCode = postalCode;
    }
}
