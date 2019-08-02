import { Component, OnInit } from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Weather} from '../../model/weather.model';
import {Forecast} from '../../model/forecast';
import {ActivatedRoute, Router} from '@angular/router';
import {FireDbService} from '../../services/fire-db.service';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {LocalDbService} from '../../services/local-db.service';


/**
 * @ignore
 */
@Component({
  selector: 'app-hive',
  templateUrl: './hive.page.html',
  styleUrls: ['./hive.page.scss'],
})

/**
 * page to display a hive
 */
export class HivePage implements OnInit {


  hive: Hive = new Hive();
  private hiveId: string;
  names: string[] = [];
  selectedPage: string = "hive";
  weatherData: Weather;
  forecasts: Forecast[] = [];


  /**
   * takes the hiveId from route to get the selected hive object
   *
   * @param route
   * @param router
   * @param fireDb
   * @param navCtrl
   * @param alertController
   * @param toastController
   * @param localDbService
   */
  constructor(private route: ActivatedRoute,
              public router: Router,
              private fireDb: FireDbService,
              private navCtrl: NavController,
              private alertController: AlertController,
              private toastController: ToastController,
              private localDbService: LocalDbService) {

    this.hiveId = this.route.snapshot.paramMap.get('hiveId');
    if (this.hiveId) {
      this.fireDb.hivesObservable.subscribe(() => {
        Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
        this.getStringofUserNames();
      });
      Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
      this.getStringofUserNames();
    }

  }

  /**
   * subscribes to weather data
   */
  ngOnInit() {

    this.localDbService.weatherObservable.subscribe((weather: Weather[]) => {
      this.localDbService.getWeatherById(this.hiveId).forecast.forEach((forecast: Forecast) => {
        this.forecasts.push(forecast);
      })
    });

    this.localDbService.getWeatherData()
        .then(
            () => console.log(''),
            () => console.log('')
        );
  }

  /**
   * routes back
   */
  back() {
    this.navCtrl.pop();
  }

  /**
   * open a dialog to ask user before deleting
   */
  deleteHive() {
    this.deleteDialog();
  }

  /**
   * route to hive-form page to edit a hive
   */
  editHive() {
    this.router.navigate(['hive-form', {hiveId: this.hiveId}]);
  }

  /**
   * self explanatory
   */
  async deleteDialog() {
    const alert = await this.alertController.create({
      header: 'Sind Sie sich wirklich, dass Sie das Volk ' + '"' + this.hive.name + '"' + ' endgültig löschen möchten?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'cancelButton',
        },
        {
          text: 'Ja',
          cssClass: 'confirmButton',
          handler: () => {
            this.fireDb.deleteHive(this.hiveId);
            this.navCtrl.pop();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * @ignore
   */
  private getStringofUserNames() {
    this.names.length = 0;
    for (let i = 0; i < this.hive.memberNames.length; i++) {
      this.names.push(' ' + this.hive.memberNames[i]);
    }
  }


  createHiveCard() {
    this.router.navigate(['hive-card-form', {hiveId: this.hiveId}]);
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}

