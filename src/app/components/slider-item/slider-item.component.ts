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
export class SliderItemComponent implements OnInit {


  @Input() hive: Hive;
  @Input() dashboard: boolean;
  @Input() dashboardCards: Hivecard[];


  constructor(private router: Router,
              private toast: ToastController) {
  }

  ngOnInit() {
  }


  editHivecard(hivecardId: string) {
    this.router.navigate(['hive-card-form', {hiveId: this.hive.id, hivecardId: hivecardId}]);
  }
}
