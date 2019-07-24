import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hive} from '../../model/hive.model';
import {FireDbService} from '../../services/fire-db.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-hivedetail',
  templateUrl: './hivedetail.page.html',
  styleUrls: ['./hivedetail.page.scss'],
})
export class HivedetailPage implements OnInit {

  hive: Hive = new Hive();

  private hiveId: string;


  constructor(private route: ActivatedRoute,
              public router: Router,
              private fireDb: FireDbService,
              private navCtrl: NavController) {
    this.hiveId = this.route.snapshot.paramMap.get('hiveId');
    if(this.hiveId){
      Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
    }
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.pop();
  }

}
