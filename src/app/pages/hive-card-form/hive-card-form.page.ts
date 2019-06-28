import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonDatetime, IonInput, IonSelect, IonTextarea, NavController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {Hive} from '../../model/hive.model';
import {HiveService} from '../../services/hive.service';
import {Hivecard} from '../../model/hive-card.model';
import {templateRefExtractor} from '@angular/core/src/render3';
import {FireDbService} from '../../services/fire-db.service';

@Component({
  selector: 'app-hive-card-form',
  templateUrl: './hive-card-form.page.html',
  styleUrls: ['./hive-card-form.page.scss'],
})
export class HiveCardFormPage implements OnInit {

  isEditMode = false;
  hivecard: Hivecard = new Hivecard();
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


  private gentleStarSelectedCount: number;
  private gentleStar_1: Element;
  private gentleStar_2: Element;
  private gentleStar_3: Element;
  private gentleStar_4: Element;
  private gentleStar_5: Element;

  private behaviorStarSelectedCount: number;
  private behaviorStar_1: Element;
  private behaviorStar_2: Element;
  private behaviorStar_3: Element;
  private behaviorStar_4: Element;
  private behaviorStar_5: Element;
  private hiveId: string;




  constructor(private route: ActivatedRoute,
              public router: Router,
              private navCtrl: NavController,
              public alertController: AlertController,
              private fireDb: FireDbService) {


    this.hiveId = this.route.snapshot.paramMap.get('hiveId');
    Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
    this.pageTitle = 'Stockkarte anlegen';
  }

  ngOnInit() {
    this.gentleStarSelectedCount = 0;
    this.gentleStar_1 = document.getElementById('gentleStar_1');
    this.gentleStar_2 = document.getElementById('gentleStar_2');
    this.gentleStar_3 = document.getElementById('gentleStar_3');
    this.gentleStar_4 = document.getElementById('gentleStar_4');
    this.gentleStar_5 = document.getElementById('gentleStar_5');

    this.behaviorStarSelectedCount = 0;
    this.behaviorStar_1 = document.getElementById('behaviorStar_1');
    this.behaviorStar_2 = document.getElementById('behaviorStar_2');
    this.behaviorStar_3 = document.getElementById('behaviorStar_3');
    this.behaviorStar_4 = document.getElementById('behaviorStar_4');
    this.behaviorStar_5 = document.getElementById('behaviorStar_5');
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
    this.hivecard.creationDate = this.dateRef.value;
    this.hivecard.broodStadium = this.stadiumRef.value;
    this.hivecard.queenSeen = this.isCheckedQueenSeen;
    // this.hiveCard.belagwaben = this.belagwabenRef.value;
    this.hivecard.gentleness = this.gentleStarSelectedCount;
    this.hivecard.swarmBehavior = this.behaviorStarSelectedCount;
    this.hivecard.comment = this.bemerkungenRef.value;
    this.hivecard.peculiarity = this.auffaeligkeitenRef.value;
    this.hivecard.hiveId = this.hive.id;
    this.hivecard.hiveName = this.hive.name;
    // this.hive.hivecards.push(this.hivecard);

    this.fireDb.addHivecardToHive(this.hiveId, this.hivecard);
    // this.hiveService.updateHive(this.hive);
    // this.hiveService.persistHiveCard(this.hivecard);
    // this.hiveService.emitChange(true);

    this.navCtrl.pop();
  }

  delete() {

  }

  gentleStar(count: number) {
    switch (count) {
      case 1:
        this.gentleStarSelectedCount = 1;
        //fill and colour selected
        this.gentleStar_1.setAttribute('name','star');
        this.gentleStar_1.setAttribute('color','warning');

        //outline and colour unselected
        this.gentleStar_2.setAttribute('name','star-outline');
        this.gentleStar_2.setAttribute('color','dark');
        this.gentleStar_3.setAttribute('name','star-outline');
        this.gentleStar_3.setAttribute('color','dark');
        this.gentleStar_4.setAttribute('name','star-outline');
        this.gentleStar_4.setAttribute('color','dark');
        this.gentleStar_5.setAttribute('name','star-outline');
        this.gentleStar_5.setAttribute('color','dark');
        break;

      case 2:
        this.gentleStarSelectedCount = 2;
        //fill and colour selected
        this.gentleStar_1.setAttribute('name','star');
        this.gentleStar_1.setAttribute('color','warning');
        this.gentleStar_2.setAttribute('name','star');
        this.gentleStar_2.setAttribute('color','warning');

        //outline and colour unselected
        this.gentleStar_3.setAttribute('name','star-outline');
        this.gentleStar_3.setAttribute('color','dark');
        this.gentleStar_4.setAttribute('name','star-outline');
        this.gentleStar_4.setAttribute('color','dark');
        this.gentleStar_5.setAttribute('name','star-outline');
        this.gentleStar_5.setAttribute('color','dark');
        break;

      case 3:
        this.gentleStarSelectedCount = 3;
        //fill and colour selected
        this.gentleStar_1.setAttribute('name','star');
        this.gentleStar_1.setAttribute('color','warning');
        this.gentleStar_2.setAttribute('name','star');
        this.gentleStar_2.setAttribute('color','warning');
        this.gentleStar_3.setAttribute('name','star');
        this.gentleStar_3.setAttribute('color','warning');

        //outline and colour unselected
        this.gentleStar_4.setAttribute('name','star-outline');
        this.gentleStar_4.setAttribute('color','dark');
        this.gentleStar_5.setAttribute('name','star-outline');
        this.gentleStar_5.setAttribute('color','dark');
        break;

      case 4:
        this.gentleStarSelectedCount = 4;
        //fill and colour selected
        this.gentleStar_1.setAttribute('name','star');
        this.gentleStar_1.setAttribute('color','warning');
        this.gentleStar_2.setAttribute('name','star');
        this.gentleStar_2.setAttribute('color','warning');
        this.gentleStar_3.setAttribute('name','star');
        this.gentleStar_3.setAttribute('color','warning');
        this.gentleStar_4.setAttribute('name','star');
        this.gentleStar_4.setAttribute('color','warning');

        //outline and colour unselected
        this.gentleStar_5.setAttribute('name','star-outline');
        this.gentleStar_5.setAttribute('color','dark');
        break;

      case 5:
        this.gentleStarSelectedCount = 5;
        //fill and colour selected
        this.gentleStar_1.setAttribute('name','star');
        this.gentleStar_1.setAttribute('color','warning');
        this.gentleStar_2.setAttribute('name','star');
        this.gentleStar_2.setAttribute('color','warning');
        this.gentleStar_3.setAttribute('name','star');
        this.gentleStar_3.setAttribute('color','warning');
        this.gentleStar_4.setAttribute('name','star');
        this.gentleStar_4.setAttribute('color','warning');
        this.gentleStar_5.setAttribute('name','star');
        this.gentleStar_5.setAttribute('color','warning');
        break;

    }
  }

  behaviorStar(count: number) {
    switch (count) {
      case 1:
        this.behaviorStarSelectedCount = 1;
        //fill and colour selected
        this.behaviorStar_1.setAttribute('name','star');
        this.behaviorStar_1.setAttribute('color','warning');

        //outline and colour unselected
        this.behaviorStar_2.setAttribute('name','star-outline');
        this.behaviorStar_2.setAttribute('color','dark');
        this.behaviorStar_3.setAttribute('name','star-outline');
        this.behaviorStar_3.setAttribute('color','dark');
        this.behaviorStar_4.setAttribute('name','star-outline');
        this.behaviorStar_4.setAttribute('color','dark');
        this.behaviorStar_5.setAttribute('name','star-outline');
        this.behaviorStar_5.setAttribute('color','dark');
        break;

      case 2:
        this.behaviorStarSelectedCount = 2;
        //fill and colour selected
        this.behaviorStar_1.setAttribute('name','star');
        this.behaviorStar_1.setAttribute('color','warning');
        this.behaviorStar_2.setAttribute('name','star');
        this.behaviorStar_2.setAttribute('color','warning');

        //outline and colour unselected
        this.behaviorStar_3.setAttribute('name','star-outline');
        this.behaviorStar_3.setAttribute('color','dark');
        this.behaviorStar_4.setAttribute('name','star-outline');
        this.behaviorStar_4.setAttribute('color','dark');
        this.behaviorStar_5.setAttribute('name','star-outline');
        this.behaviorStar_5.setAttribute('color','dark');
        break;

      case 3:
        this.behaviorStarSelectedCount = 3;
        //fill and colour selected
        this.behaviorStar_1.setAttribute('name','star');
        this.behaviorStar_1.setAttribute('color','warning');
        this.behaviorStar_2.setAttribute('name','star');
        this.behaviorStar_2.setAttribute('color','warning');
        this.behaviorStar_3.setAttribute('name','star');
        this.behaviorStar_3.setAttribute('color','warning');

        //outline and colour unselected
        this.behaviorStar_4.setAttribute('name','star-outline');
        this.behaviorStar_4.setAttribute('color','dark');
        this.behaviorStar_5.setAttribute('name','star-outline');
        this.behaviorStar_5.setAttribute('color','dark');
        break;

      case 4:
        this.behaviorStarSelectedCount = 4;
        //fill and colour selected
        this.behaviorStar_1.setAttribute('name','star');
        this.behaviorStar_1.setAttribute('color','warning');
        this.behaviorStar_2.setAttribute('name','star');
        this.behaviorStar_2.setAttribute('color','warning');
        this.behaviorStar_3.setAttribute('name','star');
        this.behaviorStar_3.setAttribute('color','warning');
        this.behaviorStar_4.setAttribute('name','star');
        this.behaviorStar_4.setAttribute('color','warning');

        //outline and colour unselected
        this.behaviorStar_5.setAttribute('name','star-outline');
        this.behaviorStar_5.setAttribute('color','dark');
        break;

      case 5:
        this.behaviorStarSelectedCount = 5;
        //fill and colour selected
        this.behaviorStar_1.setAttribute('name','star');
        this.behaviorStar_1.setAttribute('color','warning');
        this.behaviorStar_2.setAttribute('name','star');
        this.behaviorStar_2.setAttribute('color','warning');
        this.behaviorStar_3.setAttribute('name','star');
        this.behaviorStar_3.setAttribute('color','warning');
        this.behaviorStar_4.setAttribute('name','star');
        this.behaviorStar_4.setAttribute('color','warning');
        this.behaviorStar_5.setAttribute('name','star');
        this.behaviorStar_5.setAttribute('color','warning');
        break;

    }
  }

  private fillStar(element: Element) {

  }

  private colorStar(element: Element) {
  }
}
