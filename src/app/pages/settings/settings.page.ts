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

/**
 * this page is used for a user to select given options
 */
export class SettingsPage implements OnInit {

  settings: Settings;
  viewKind: string;
  hivecardNoti: boolean;

  /**
   *
   * @param router
   * @param localDb
   * @param toastController
   * @param oneSignal
   * @param alertController
   */
  constructor(private router: Router,
              private localDb: LocalDbService,
              private toastController: ToastController,
              private oneSignal: OneSignal,
              private alertController: AlertController) {

    this.settings = this.localDb.settings;
    this.viewKind = this.settings.viewKind;
    this.hivecardNoti = this.settings.hivecardNotification;
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * self explanatory
   */
  back() {
    this.router.navigateByUrl('menu');
  }

  /**
   * saves a users settings
   */
  save() {
    this.settings.viewKind = this.viewKind;
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

  /**
   *
   * @ignore
   */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }


  /**
   *
   * @ignore
   */
  async anyDialog(msg: string) {
    const alert = await this.alertController.create({
      header: msg,
    });
    await alert.present();
  }


}
