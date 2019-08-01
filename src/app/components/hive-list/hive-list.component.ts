import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Router} from '@angular/router';
import {FireDbService} from '../../services/fire-db.service';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss'],
})
export class HiveListComponent implements OnInit {

  @Input() hive: Hive;

  constructor(private router: Router,
              private fireDb: FireDbService) { }

  ngOnInit() {}

  moveToHivedetail(id: string) {
    this.router.navigate(['hivedetail', {hiveId: id}]);
  }
}
