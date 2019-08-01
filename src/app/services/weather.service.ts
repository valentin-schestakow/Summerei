import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static WEATHER_URL = 'https://api.weatherbit.io/v2.0/';
  weatherData: any = "";
  apiKey: string = "41aea7e2922b4647819b485d1f262d85";
  // postalCode: string = "";

  constructor(private http: HttpClient) { }

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

  //@TODO
  // async subscribeToWarnings() {
  //
  // }
}
