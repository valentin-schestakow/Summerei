import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static WEATHER_URL = 'https://api.weatherbit.io/v2.0/';
  weatherData: any = "";
  apiKey: string = "";
  postalCode: string = "";

  constructor(private http: HttpClient) { }

  loadForecast() {
    // this.http.get(WeatherService.WEATHER_URL + 'forecast/daily?&postal_code='+this.postalCode+'&country=DE&lang=de&key='+this.apiKey,
    this.http.get(WeatherService.WEATHER_URL + 'forecast/daily?&postal_code=35390&country=DE&lang=de&key=41aea7e2922b4647819b485d1f262d85', {
      observe: 'response',
      // headers: lastModified ? {'If-Modified-Since': lastModified} : {}
    }).subscribe((response) => {
      console.log(response.body);
    },
        (error: HttpErrorResponse) => {
      console.log(error);
        })
  }
}
