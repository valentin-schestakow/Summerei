import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalDbService} from '../../services/local-db.service';
import {Settings} from '../../model/settings.model';
import {ToastController} from '@ionic/angular';

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
              private toastController: ToastController,) {
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
    this.localDb.saveSettings(this.settings);
    // this.localDb.setSettings(this.settings);
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

}
