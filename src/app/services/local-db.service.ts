import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {NavController, ToastController} from '@ionic/angular';
import {Settings} from '../model/settings.model';
import {Observable, Subject} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {Weather} from '../model/weather.model';
import {Hive} from '../model/hive.model';
import {Forecast} from '../model/forecast';
import {Hivecard} from '../model/hive-card.model';


@Injectable({
    providedIn: 'root'
})
export class LocalDbService {

    settings: Settings = new Settings();
    private settingsSubject = new Subject<any>();
    public settingsObservable = this.settingsSubject.asObservable();

    weatherData: Weather[] = [];
    private weatherSubject = new Subject<any>();
    public weatherObservable = this.weatherSubject.asObservable();

    pushId: string = '';
    private pushIdSubject = new Subject<any>();
    public pushIdObservable = this.pushIdSubject.asObservable();

    public hives: Hive[];
    private hivesSubject = new Subject<any>();
    public hivesObservable = this.hivesSubject.asObservable();

    constructor(private nativeStorage: NativeStorage,
                private toastController: ToastController,) {
    }

    clearLocalStorage() {
        this.nativeStorage.remove('settings');
        this.nativeStorage.remove('user');
        this.nativeStorage.remove('hives');
        this.nativeStorage.remove('weather');
    }


    // ----------------USER-FUNCTIONS---------------
    async checkIfUserIsLoggedIn(): Promise<any> {

        return await this.nativeStorage.getItem('user')
            .then(data => {
                return Promise.resolve(data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }


    saveLoginLocal(email: string, password: string, id: string, name: string) {
        this.nativeStorage.setItem('user', {email: email, password: password, id: id, name: name})
            .then(
                () => console.log('Stored User!'),
                error => console.log('Error storing user' + error)
            );
    }

    async getLocalLogin(): Promise<any> {

        await this.nativeStorage.getItem('user')
            .then((data) => {
                return Promise.resolve(data);
            }).catch((error) => {
                return Promise.reject(false);
                ;
            });
    }


    //-----------SETTINGS-FUNCTIONS----------------

    async getUserSettings(): Promise<any> {


        await this.nativeStorage.getItem('settings')
            .then(data => {
                this.setSettings(new Settings(data.viewKind, data.hivecardNotification, data.weatherNotification));
                return Promise.resolve(true);
            }).catch((error) => {
                return Promise.reject(false);
            });
    }


    saveSettings(settings: Settings) {
        this.settings = settings;
        this.nativeStorage.setItem('settings', JSON.parse(JSON.stringify(settings)))
        // {viewKind: settings.viewKind, hivecardNotifivation: settings.hivecardNotifivation, weatherNotification: settings.weatherNotification}
            .then(
                () => this.setSettings(settings),
                error => console.log('Error storing settings' + error)
            );
    }


    public setSettings(settings: Settings) {
        console.log(JSON.stringify(settings));
        this.settings = settings;
        this.settingsSubject.next(settings);
    }

    //----------------WEATHER-DATA-----------------------------------------

    async getWeatherData(): Promise<any> {
        await this.nativeStorage.getItem('weather')
            .then((data) => {


                let tempWeather: Weather[] = [];
                data.forEach((weatherObject) => {

                    let tempForecast: Forecast[] = [];
                    weatherObject.forecast.forEach((forecast) => {
                        tempForecast.push(plainToClass(Forecast, forecast));
                    });

                    tempWeather.push(new Weather(weatherObject.hiveId, weatherObject.lastModified, tempForecast));
                });
                this.setWeather(tempWeather);
                // this.presentToast('getWeatherData' + tempWeather[0].forecast[0].description);
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    async setWeatherData(weather: Weather): Promise<any> {
        this.addWeatherData(weather);
        await this.nativeStorage.setItem('weather', JSON.parse(JSON.stringify(this.weatherData)))
            .then(() => {
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    private addWeatherData(weather: Weather) {
        let weatherIndex: number = this.weatherData.findIndex(obj => obj.hiveId == weather.hiveId);
        if (weatherIndex != -1) {
            this.weatherData.splice(weatherIndex, 1);
            this.weatherData.push(weather);
            this.setWeather(this.weatherData);
        } else {
            this.weatherData.push(weather);
            this.setWeather(this.weatherData);
        }
    }

    getWeatherById(hiveId: string) {
        return this.weatherData.find(obj => obj.hiveId == hiveId);
    }


    public setWeather(weatherData: Weather[]) {
        console.log(JSON.stringify(weatherData));
        this.weatherData = weatherData;
        this.weatherSubject.next(weatherData);
    }


    //----------------PUSH-DATA-----------------------------------------
    async savePushId(id: string) {
        await this.nativeStorage.setItem('pushId', {id: id})
            .then(() => {
                this.setPushId(id);
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    async getPushData(): Promise<any> {
        await this.nativeStorage.getItem('pushId')
            .then((data) => {
                // this.presentToast(data.id)
                Promise.resolve(data.id);
            }).catch((error) => {
                Promise.reject(error);
            });
    }

    private setPushId(id: string) {
        this.pushId = id;
        this.pushIdSubject.next(id);
    }

    // ----------------HIVE-DATA------------------------------------------
    async saveHives(hives: Hive[]): Promise<any> {
        await this.nativeStorage.setItem('hives', JSON.parse(JSON.stringify(hives)))
            .then(() => {
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    async getHives(): Promise<any> {
        await this.nativeStorage.getItem('hives')
            .then((hives: any[]) => {

                let tempHives: Hive[] = [];

                hives.forEach((hive: Hive) => {
                    tempHives.push(plainToClass(Hive, hive));
                });

                // hives.forEach((hive: Hive) => {
                //     let tempCards: Hivecard[] = [];
                //     hive.hivecards.forEach((card) => tempCards.push(plainToClass(Hivecard, card)));
                //     hive.hivecards = tempCards;
                //     tempHives.push(plainToClass(Hive, hive));
                // });

                this.setHives(tempHives);

                // this.presentToast('got Hives');
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    private setHives(hives: Hive[]) {
        this.hives = hives;
        this.hivesSubject.next(hives);
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 20000,
        });
        toast.present();
    }


}
