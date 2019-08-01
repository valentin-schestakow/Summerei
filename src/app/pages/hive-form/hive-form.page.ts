import {Component, OnInit, ViewChild} from '@angular/core';
import {Hivecard} from '../../model/hive-card.model';
import {Hive} from '../../model/hive.model';
import {AlertController, IonTextarea, NavController, PopoverController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorPickerPage} from '../color-picker/color-picker.page';
import {FireDbService} from '../../services/fire-db.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {WeatherService} from '../../services/weather.service';
import {SmileyPickerPage} from '../smiley-picker/smiley-picker.page';
import {LocalDbService} from '../../services/local-db.service';
import {Weather} from '../../model/weather.model';
import {FirestoreWeather} from '../../model/firestore-weather.model';
import {Forecast} from '../../model/forecast';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.page.html',
  styleUrls: ['./hive-form.page.scss'],
})
export class HiveFormPage implements OnInit {
  isEditMode = false;
  hivecard: Hivecard = new Hivecard();
  hive: Hive = new Hive();
  pageTitle: string;



  selectedColor: string = "blue";

  @ViewChild('hiveName')
  private hiveNameRef: IonTextarea;
  @ViewChild('race')
  private raceRef: IonTextarea;
  @ViewChild('beehiveKind')
  private beehiveKindRef: IonTextarea;

  location: string = "";
  locationSet: boolean = false;

  state: string = "good";

  showSpinner: boolean = false;
  private showDelete: boolean;
  weather: Weather;
  private firestoreWeather: FirestoreWeather = new FirestoreWeather('','');




  constructor(private route: ActivatedRoute,
              public router: Router,
              private navCtrl: NavController,
              public popoverController: PopoverController,
              private fireDb: FireDbService,
              private geolocation: Geolocation,
              private alertController: AlertController,
              private weatherService: WeatherService,
              private toastController: ToastController,
              private localDb: LocalDbService,
              private firebaseFirestore: AngularFirestore,
              private firestore: AngularFirestore) {

    if(this.localDb.settings.viewKind == "slideView") {
      this.showDelete = true;
    } else {
      this.showDelete = false;
    }
  }

  ngOnInit() {
    let hiveId = this.route.snapshot.paramMap.get('hiveId');
    if(hiveId) {
      Object.assign(this.hive, this.fireDb.findHiveById(hiveId));
      this.isEditMode = true;
      this.pageTitle = 'Volk bearbeiten';
    } else {
      this.hive = new Hive();
      this.hive.id = "";
      this.pageTitle = 'Volk anlegen';
    }
  }

  ionViewWillEnter() {
    if (this.isEditMode) {
      this.hiveNameRef.value = this.hive.name;
      this.raceRef.value = this.hive.race;
      this.beehiveKindRef.value = this.hive.beehiveKind;
      this.state = this.hive.state;
      this.selectedColor = this.hive.queenColor;
      if (this.hive.location.city !== "") {
        this.location = this.hive.location.city;
        this.locationSet = true;
      }
      this.firestoreWeather = this.hive.location;
    }
  }

  back() {
    this.navCtrl.pop();
  }

  async save() {
    this.hive.name = this.hiveNameRef.value;
    this.hive.queenColor = this.selectedColor;
    this.hive.race = this.raceRef.value;
    this.hive.beehiveKind = this.beehiveKindRef.value;
    this.hive.location = this.firestoreWeather;
    this.hive.state = this.state;

    if (this.isEditMode) {
      this.fireDb.updateHive(this.hive);
      this.back();
    } else {
        this.fireDb.createHive(this.hive);
        this.back();
    }


  }

  delete() {
    this.fireDb.deleteHive(this.hive.id);
    this.back();
  }

  async moreColorButton(ev: Event) {
    let popover = await this.popoverController.create({
      event: ev,
      component: ColorPickerPage,
      cssClass: 'custom-popover',
    });

    await popover.present();
    await popover.onDidDismiss().then( data => {
      console.log(data);
      if(data.data != undefined) {
        this.selectedColor = data.data;
      }
    })
  }

  getLocation(postalCode: string) {
    this.weatherService.loadForecast(postalCode).then((response) => {
      this.firestoreWeather = new FirestoreWeather(response.body.city_name, postalCode);


      let tempForecastArray: Forecast[] = [];
      response.body.data.forEach((forecast) => {

          // let yyyy = JSON.stringify(forecast.datetime).slice(0,5);
          // let mm = JSON.stringify(forecast.datetime).slice(6,8);
          // let dd = JSON.stringify(forecast.datetime).slice(9);
          // let date = dd + "/" + mm + "/" + yyyy;
          let tempForecast: Forecast = new Forecast(forecast.app_min_temp, forecast.app_max_temp, forecast.temp, forecast.datetime, forecast.weather.description, forecast.weather.icon);
          tempForecastArray.push(tempForecast);
      });

      let weather: Weather = new Weather();
    if(this.isEditMode) {
      weather.hiveId = this.hive.id;
      weather.lastModified = new Date().toISOString();
      weather.forecast = tempForecastArray;
    } else {
      let id = this.firebaseFirestore.createId();
      this.hive.id = id;
      weather.hiveId = id;
      weather.lastModified = new Date().toISOString();
      weather.forecast = tempForecastArray;
    }

    // let test4 = JSON.stringify(weather);
    // let test2 = JSON.parse(JSON.stringify(weather));
    // let testw: Weather = plainToClass(Weather,JSON.parse(JSON.stringify(weather)));


    this.localDb.setWeatherData(weather);

      console.log(response.body);
      this.location = response.body.city_name;
      this.showSpinner = false;
      this.locationSet = true;
    }).catch(() => {
      this.showSpinner = false;
    });
  }

  async locationDialog() {
    const alert = await this.alertController.create({
      header: 'Geben Sie bitte die Postleizahl des Standortes an:',
      inputs: [
        {
          name: 'postalCode',
          type: 'text',
          id: 'postalCode',
          placeholder: 'Postleizahl'
        }],
      buttons: [
        {
          text: 'schließen',
          role: 'cancel',
          cssClass: 'cancelButton',
        },
        {
          text: 'speichern',
          cssClass: 'confirmButton',
          handler: (data) => {
            this.showSpinner = true;
            this.getLocation(data.postalCode);
          }
        }
      ]
    });

    await alert.present();

  }

  async moreSmileysButton(ev: Event) {
    let popover = await this.popoverController.create({
      event: ev,
      component: SmileyPickerPage,
      cssClass: 'custom-popover',
    });

    await popover.present();
    await popover.onDidDismiss().then( data => {
      console.log(data);
      if(data.data != undefined) {
        this.state = data.data;
      }
    })
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
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
