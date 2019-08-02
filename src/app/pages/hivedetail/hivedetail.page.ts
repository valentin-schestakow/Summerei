import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hive} from '../../model/hive.model';
import {FireDbService} from '../../services/fire-db.service';
import {AlertController, IonSearchbar, NavController, ToastController} from '@ionic/angular';
import {Weather} from '../../model/weather.model';
import {Forecast} from '../../model/forecast';
import {LocalDbService} from '../../services/local-db.service';

@Component({
    selector: 'app-hivedetail',
    templateUrl: './hivedetail.page.html',
    styleUrls: ['./hivedetail.page.scss'],
})
export class HivedetailPage implements OnInit {
    hive: Hive = new Hive();
    private hiveId: string;
    names: string[] = [];

    selectedPage: string = "hive";
    weatherData: Weather;
    forecasts: Forecast[] = [];


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

    ngOnInit() {

        this.localDbService.weatherObservable.subscribe((weather: Weather[]) => {
            let tempForecasts: Forecast[] = [];
            this.localDbService.getWeatherById(this.hiveId).forecast.forEach((forecast: Forecast) => {
                tempForecasts.push(forecast);
            });
            this.forecasts = tempForecasts;
        });

        this.localDbService.getWeatherData()
            .then(
                () => console.log('getWeather true'),
                () => console.log('getWeather false')
            );
    }

    back() {
        this.navCtrl.pop();
    }

    deleteHive() {
        this.deleteDialog();
    }

    editHive() {
        this.router.navigate(['hive-form', {hiveId: this.hiveId}]);
    }

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

    getStringofUserNames() {
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
