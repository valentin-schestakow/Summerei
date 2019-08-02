import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Hivecard} from '../../model/hive-card.model';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})

/**
 * this component is used to render hivecards
 */
export class SliderItemComponent implements OnInit {


  /**
   * hive in which are all the hivecards, which will be rendered
   */
  @Input() hive: Hive;
  @Input() dashboard: boolean;
  @Input() dashboardCards: Hivecard[];


  /**
   * @ignore
   */
  constructor(private router: Router,) {
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }


  /**
   * routes to a hive-card-form Page, to edit a hivecard
   *
   * @param hivecardId id of the hivecard which was selected to edit
   */
  editHivecard(hivecardId: string) {
    this.router.navigate(['hive-card-form', {hiveId: this.hive.id, hivecardId: hivecardId}]);
  }
}
