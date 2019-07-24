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

  location: any = "";
  locationSet: boolean = false;

  state: string = "good";

  showSpinner: boolean = false;


  constructor(private route: ActivatedRoute,
              public router: Router,
              private navCtrl: NavController,
              public popoverController: PopoverController,
              private fireDb: FireDbService,
              private geolocation: Geolocation,
              private alertController: AlertController,
              private weatherService: WeatherService,
              private toastController: ToastController) {


    const hiveId = this.route.snapshot.paramMap.get('hiveId');
    if(hiveId) {
      Object.assign(this.hive, this.fireDb.findHiveById(hiveId));
      this.isEditMode = true;
      this.pageTitle = 'Volk bearbeiten';
    } else {
      this.hive = new Hive();
      this.pageTitle = 'Volk anlegen';
    }

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.isEditMode) {
      this.hiveNameRef.value = this.hive.name;
      this.raceRef.value = this.hive.race;
      this.beehiveKindRef.value = this.hive.beehiveKind;
      this.state = this.hive.state;
      if (this.hive.location !== "") {
        this.location = this.hive.location;
        this.locationSet = true;
      }
    }
  }

  back() {
    this.navCtrl.pop();
  }

  save() {
    this.hive.name = this.hiveNameRef.value;
    this.hive.queenColor = this.selectedColor;
    this.hive.race = this.raceRef.value;
    this.hive.beehiveKind = this.beehiveKindRef.value;
    this.hive.location = this.location;
    this.hive.state = this.state;
    if(this.location !== ""){
      this.hive.location = this.location;
    } else {
      this.hive.location = "unset"
    }

    if (this.isEditMode) {
      this.fireDb.updateHive(this.hive);
    } else {
      this.fireDb.createHive(this.hive);
    }

    this.back();
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
      this.selectedColor = data.data;
        })
  }

  getLocation(name: string) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = {name: name, latitude: resp.coords.latitude, longitude: resp.coords.longitude};
      this.locationSet = true;
      this.showSpinner = false;

      this.weatherService.loadForecast();


    }).catch((error) => {
      console.log('Error getting location', error);
      this.showSpinner = false;
      // this.presentToast('error');
    });
  }

  async locationDialog() {
    const alert = await this.alertController.create({
      header: 'Name des Standort:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          placeholder: 'beliebiger Name'
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
            this.getLocation(data.name);
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
      this.state = data.data;
    })
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
