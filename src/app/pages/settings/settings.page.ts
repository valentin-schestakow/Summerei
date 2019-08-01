import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalDbService} from '../../services/local-db.service';
import {Settings} from '../../model/settings.model';
import {AlertController, ToastController} from '@ionic/angular';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: Settings;
  viewKind: string;
  weatherNoti: boolean;
  hivecardNoti: boolean;

  constructor(private router: Router,
              private localDb: LocalDbService,
              private toastController: ToastController,
              private oneSignal: OneSignal,
              private alertController: AlertController) {

    this.settings = this.localDb.settings;
    this.viewKind = this.settings.viewKind;
    this.hivecardNoti = this.settings.hivecardNotification;
    this.weatherNoti = this.settings.weatherNotification;
  }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('menu');
  }

  save() {
    this.settings.viewKind = this.viewKind;
    this.settings.weatherNotification = this.weatherNoti;
    this.settings.hivecardNotification = this.hivecardNoti;

    if(this.settings.viewKind == 'slideView') {
      this.anyDialog('Bei dieser Ansicht handelt es sich um eine, welche nicht vollständig funktioniert und fehlerhaft ist. Ich arbeite aber daran, dass sich das ändert!');
    }

    this.localDb.saveSettings(this.settings);
    if(!this.settings.hivecardNotification) {
      this.oneSignal.setSubscription(false);
    } else {
      this.oneSignal.setSubscription(true);
    }

    this.back();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }


  async anyDialog(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
    });
    await alert.present();
  }


}
