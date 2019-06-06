import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {HiveCard} from '../../model/hive-card.model';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})
export class SliderItemComponent implements OnInit {


  @Input() hive: Hive;
  @Input() dashboard: boolean;
  @Input() dashboardCards: HiveCard[];

  constructor() { }

  ngOnInit() {}

}
