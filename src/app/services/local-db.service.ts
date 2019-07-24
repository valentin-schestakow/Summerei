import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ToastController} from '@ionic/angular';
import {Settings} from '../model/settings.model';
import {Observable, Subject} from 'rxjs';
import {plainToClass} from 'class-transformer';


@Injectable({
    providedIn: 'root'
})
export class LocalDbService {

    settings: Settings = new Settings();

    private settingsSubject = new Subject<any>();
    public settingsObservable = this.settingsSubject.asObservable();


    constructor(private nativeStorage: NativeStorage,
                private toastController: ToastController,) {
    }

    clearLocalStorage() {
        this.nativeStorage.clear();
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


    saveLoginLocal(email: string, password: string, id: string) {
        this.nativeStorage.setItem('user', {email: email, password: password, id: id})
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
        this.settings = settings;
        this.settingsSubject.next(settings);
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }


}
