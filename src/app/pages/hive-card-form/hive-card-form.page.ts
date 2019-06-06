import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonDatetime, IonInput, IonSelect, IonTextarea, NavController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {Hive} from '../../model/hive.model';
import {HiveService} from '../../services/hive.service';
import {HiveCard} from '../../model/hive-card.model';
import {templateRefExtractor} from '@angular/core/src/render3';

@Component({
  selector: 'app-hive-card-form',
  templateUrl: './hive-card-form.page.html',
  styleUrls: ['./hive-card-form.page.scss'],
})
export class HiveCardFormPage implements OnInit {

  isEditMode = false;
  hiveCard: HiveCard = new HiveCard();
  hive: Hive = new Hive();
  pageTitle: string;
  stadien: number[] = [1,2,3];


  isCheckedQueenSeen: boolean = false;
  @ViewChild('date')
  private dateRef: IonDatetime;
  @ViewChild('stadium')
  private stadiumRef: IonSelect;
  @ViewChild('belagwaben')
  private belagwabenRef: IonInput;
  @ViewChild('sanftmut')
  private sanftmutRef: IonInput;
  @ViewChild('schwarmverhalten')
  private schwarmverhaltenRef: IonInput;
  @ViewChild('bemerkungen')
  private bemerkungenRef: IonTextarea;
  @ViewChild('auffaeligkeiten')
  private auffaeligkeitenRef: IonTextarea;



  constructor(private route: ActivatedRoute,
              private hiveService: HiveService,
              public router: Router,
              private navCtrl: NavController,
              public alertController: AlertController) {


    const hiveId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    Object.assign(this.hive, this.hiveService.findHiveById(hiveId));
    this.pageTitle = 'Stockkarte anlegen';
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
    this.hiveCard.erstelldatum = this.dateRef.value;
    this.hiveCard.stadium = this.stadiumRef.value;
    this.hiveCard.koenigin_gesehen = this.isCheckedQueenSeen;
    this.hiveCard.belagwaben = this.belagwabenRef.value;
    this.hiveCard.sanftmut = "this.sanftmutRef.value";
    this.hiveCard.schwarmverhalten = "this.schwarmverhaltenRef.value";
    this.hiveCard.bemerkungen = this.bemerkungenRef.value;
    this.hiveCard.auffaeligkeiten = this.auffaeligkeitenRef.value;
    this.hiveCard.volkId = this.hive.id;
    this.hiveCard.hiveName = this.hive.name;
    this.hive.stockkarten.push(this.hiveCard);

    this.hiveService.updateHive(this.hive);
    this.hiveService.persistHiveCard(this.hiveCard);
    this.hiveService.emitChange(true);

    this.navCtrl.pop();
  }

  delete() {

  }
}
