import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss'],
})
export class HiveListComponent implements OnInit {

  @Input() hive: Hive;

  constructor(private router: Router,) { }

  ngOnInit() {}

  moveToHivedetail(id: string) {
    this.router.navigate(['hivedetail', {hiveId: id}]);
  }
}
