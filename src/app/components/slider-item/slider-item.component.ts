import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Hivecard} from '../../model/hive-card.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})
export class SliderItemComponent implements OnInit {


  @Input() hive: Hive;
  @Input() dashboard: boolean;
  @Input() dashboardCards: Hivecard[];

  constructor(private router: Router,) {
  }

  ngOnInit() {
  }


  editHivecard(hivecardId: string) {
    this.router.navigate(['hive-card-form', {hiveId: this.hive.id, hivecardId: hivecardId}]);
  }
}
