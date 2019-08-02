import {Component, Input, OnInit} from '@angular/core';
import {Hive} from '../../model/hive.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss'],
})

/**
 * This Component is used for rendering a list view for hive Objects.
 * Each Component represents a Hive in the List
 */
export class HiveListComponent implements OnInit {

  /**
   * The Hive which will be rendered
   */
  @Input() hive: Hive;

  /**
   *
   * @param router will be used to route a detailed page of this hive
   */
  constructor(private router: Router,) { }

  /**
   * @ignore
   */
  ngOnInit() {}

  /**
   * This Function routes to a Detailed View of this Hive
   *
   * @param id id of the selected hive
   */
  moveToHivedetail(id: string) {
    this.router.navigate(['hivedetail', {hiveId: id}]);
  }
}
