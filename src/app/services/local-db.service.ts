import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ToastController} from '@ionic/angular';
import {Settings} from '../model/settings.model';
import {Subject} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {Weather} from '../model/weather.model';
import {Hive} from '../model/hive.model';
import {Forecast} from '../model/forecast';


@Injectable({
    providedIn: 'root'
})

/**
 * used to save all mandatory data for current user
 */
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

    /**
     * clear whole local storage except for pushId, which can only be retrieved once
     */
    clearLocalStorage() {
        this.nativeStorage.remove('settings');
        this.nativeStorage.remove('user');
        this.nativeStorage.remove('hives');
        this.nativeStorage.remove('weather');
    }


    // ----------------USER-FUNCTIONS---------------
    /**
     * self explanatory
     *
     * @return Promise<any> resolves user data if succeeded and false otherwise
     */
    async checkIfUserIsLoggedIn(): Promise<any> {

        return await this.nativeStorage.getItem('user')
            .then(data => {
                return Promise.resolve(data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }


    /**
     * self explanatory
     *
     * @param email
     * @param password
     * @param id
     * @param name
     */
    saveLoginLocal(email: string, password: string, id: string, name: string) {
        this.nativeStorage.setItem('user', {email: email, password: password, id: id, name: name})
            .then(
                () => console.log('Stored User!'),
                error => console.log('Error storing user' + error)
            );
    }

    /**
     * @ignore
     */
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

    /**
     * self explanatory
     *
     * @return Promise<any> return settings if available, false otherwise
     */
    async getUserSettings(): Promise<any> {


        await this.nativeStorage.getItem('settings')
            .then(data => {
                this.setSettings(new Settings(data.viewKind, data.hivecardNotification));
                return Promise.resolve(true);
            }).catch((error) => {
                return Promise.reject(false);
            });
    }


    /**
     * self explanatory
     *
     * @param settings
     */
    saveSettings(settings: Settings) {
        this.settings = settings;
        this.nativeStorage.setItem('settings', JSON.parse(JSON.stringify(settings)))
        // {viewKind: settings.viewKind, hivecardNotifivation: settings.hivecardNotifivation, weatherNotification: settings.weatherNotification}
            .then(
                () => this.setSettings(settings),
                error => console.log('Error storing settings' + error)
            );
    }


    /**
     * triggers observable next function for weatherObservable
     *
     * @param settings
     */
    public setSettings(settings: Settings) {
        console.log(JSON.stringify(settings));
        this.settings = settings;
        this.settingsSubject.next(settings);
    }

    //----------------WEATHER-DATA-----------------------------------------

    /**
     * self explanatory
     *
     * @return Promise<any> returns true if available, false otherwise
     */
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

    /**
     * saves weather data and triggers observables next function for this data
     *
     * @param weather
     */
    async setWeatherData(weather: Weather): Promise<any> {
        this.addWeatherData(weather);
        await this.nativeStorage.setItem('weather', JSON.parse(JSON.stringify(this.weatherData)))
            .then(() => {
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    /**
     * triggers observables next function
     *
     * @param weather
     */
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

    /**
     * self explanatory
     *
     * @param hiveId
     * @return weather data for given hive
     */
    getWeatherById(hiveId: string) {
        return this.weatherData.find(obj => obj.hiveId == hiveId);
    }


    public setWeather(weatherData: Weather[]) {
        console.log(JSON.stringify(weatherData));
        this.weatherData = weatherData;
        this.weatherSubject.next(weatherData);
    }


    //----------------PUSH-DATA-----------------------------------------

    /**
     * self explanatory
     *
     * @param id pushId to be saved
     */
    async savePushId(id: string) {
        await this.nativeStorage.setItem('pushId', {id: id})
            .then(() => {
                this.setPushId(id);
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }


    /**
     * @ignore
     */
    async getPushData(): Promise<any> {
        await this.nativeStorage.getItem('pushId')
            .then((data) => {
                // this.presentToast(data.id)
                Promise.resolve(data.id);
            }).catch((error) => {
                Promise.reject(error);
            });
    }

    /**
     * triggers observables next function for pushIdObservable
     *
     * @param id
     */
    private setPushId(id: string) {
        this.pushId = id;
        this.pushIdSubject.next(id);
    }

    // ----------------HIVE-DATA------------------------------------------


    /**
     * self explanatory
     *
     * @param hives to save local
     */
    async saveHives(hives: Hive[]): Promise<any> {
        await this.nativeStorage.setItem('hives', JSON.parse(JSON.stringify(hives)))
            .then(() => {
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }


    /**
     * self explanatory
     *
     * @return true if hives available, false otherwise
     */
    async getHives(): Promise<any> {
        await this.nativeStorage.getItem('hives')
            .then((hives: any[]) => {

                let tempHives: Hive[] = [];

                hives.forEach((hive: Hive) => {
                    tempHives.push(plainToClass(Hive, hive));
                });
                this.setHives(tempHives);

                // this.presentToast('got Hives');
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    /**
     * triggers observables next function for hivesObservable
     *
     * @param hives
     */
    private setHives(hives: Hive[]) {
        this.hives = hives;
        this.hivesSubject.next(hives);
    }


    /**
     *
     * @ignore
     * */
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 20000,
        });
        toast.present();
    }


}
