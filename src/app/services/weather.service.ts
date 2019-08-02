import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  /**
   * api url
   */
  static WEATHER_URL = 'https://api.weatherbit.io/v2.0/';
  /**
   * api key
   */
  apiKey: string = "41aea7e2922b4647819b485d1f262d85";

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * GET request to api for weather data by given postal code
   *
   * @param postalCode postal code of location
   */
  async loadForecast(postalCode: string): Promise<any> {
    return await this.http.get(WeatherService.WEATHER_URL + 'forecast/daily?&postal_code='+postalCode+'&country=DE&lang=de&key='+this.apiKey, {
      observe: 'response',
    }).toPromise().then((response: any) => {
      return Promise.resolve(response);
    }).catch((error) => {
      console.log(error)
      return Promise.reject(false);
    });
  }
}
