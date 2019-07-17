import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
  weatherData: any = "";
  appID: string = "";

  constructor(private http: HttpClient) { }

  loadForecast() {
    this.http.get(WeatherService.WEATHER_URL + 'lat=' + '50.5654999' + '&lon=' + '8.796356099999999' + '&units=metric' + '&appid=' + '7cc4a8c80e2008e20a47678294d0b805', {
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
