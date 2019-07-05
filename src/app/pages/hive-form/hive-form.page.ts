import {Component, OnInit, ViewChild} from '@angular/core';
import {Hivecard} from '../../model/hive-card.model';
import {Hive} from '../../model/hive.model';
import { IonTextarea, NavController, PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorPickerPage} from '../color-picker/color-picker.page';
import {FireDbService} from '../../services/fire-db.service';

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

  selectedColor: string = "primary";

  @ViewChild('hiveName')
  private hiveNameRef: IonTextarea;
  @ViewChild('race')
  private raceRef: IonTextarea;
  @ViewChild('beehiveKind')
  private beehiveKindRef: IonTextarea;
  // @ViewChild('position')
  // private positionRef: IonTextarea;





  constructor(private route: ActivatedRoute,
              public router: Router,
              private navCtrl: NavController,
              public popoverController: PopoverController,
              private fireDb: FireDbService) {


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

  back() {
    this.navCtrl.pop();
  }

  /**
   * @Todo
   * - Nutzereinganben überprüfen und melden
   * - Fallunterscheidung zwischen neu Karte anlegen und vorhandene bearbeiten
   */
  save() {
    this.hive.name = this.hiveNameRef.value;
    this.hive.queenColor = this.selectedColor;
    this.hive.race = this.raceRef.value;
    this.hive.beehiveKind = this.beehiveKindRef.value;
    //@TODO Standort holen
    // this.hive. = this.positionRef.value;

    if (this.isEditMode) {
      this.fireDb.updateHive(this.hive);
    } else {
      this.fireDb.createHive(this.hive);
    }

    this.navCtrl.pop();
  }

  delete() {
    this.fireDb.deleteHive(this.hive.id);
    this.navCtrl.pop();
  }

  async moreColorButton(ev: Event) {
    let popover = await this.popoverController.create({
      event: ev,
      component: ColorPickerPage,
    });

    await popover.present();
    await popover.onDidDismiss().then( data => {
      console.log(data);
      this.selectedColor = data.data;
        })
  }

}
