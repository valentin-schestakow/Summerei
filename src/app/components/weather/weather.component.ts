import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {LocalDbService} from '../../services/local-db.service';
import {Weather} from '../../model/weather.model';
import {ToastController} from '@ionic/angular';
import {Forecast} from '../../model/forecast';
import {FirestoreWeather} from '../../model/firestore-weather.model';
import {WeatherService} from '../../services/weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

    @Input() hiveId: string;
    @Input() postalCode: string;
    @Input() forecasts: Forecast[];
    // forecasts: Forecast[];

    constructor(private localDb: LocalDbService,
                private toastController: ToastController,
                private weatherService: WeatherService,
                private localDbService: LocalDbService) {
    }

    ngOnInit() {
    }

    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }

    doRefresh(event) {
        if (this.postalCode != '') {
            this.weatherService.loadForecast(this.postalCode).then((response) => {

                let tempForecastArray: Forecast[] = [];
                response.body.data.forEach((forecast) => {
                    let tempForecast: Forecast = new Forecast(forecast.app_min_temp, forecast.app_max_temp, forecast.temp, forecast.datetime, forecast.weather.description, forecast.weather.icon);
                    tempForecastArray.push(tempForecast);
                });
                console.log(response.body);

                let weather: Weather = new Weather();
                weather.hiveId = this.hiveId;
                weather.lastModified = new Date().toISOString();
                weather.forecast = tempForecastArray;
                this.localDb.setWeatherData(weather).then(() => {
                    event.target.complete();
                    // this.presentToast('weatherdata was saved!')
                }).catch(() => {
                    event.target.complete();
                    // this.presentToast('weatherdata was not saved!!!!')
                });

            }).catch(() => {
                event.target.complete();
                console.log('catch refresh');
            });
        }
    }

}
