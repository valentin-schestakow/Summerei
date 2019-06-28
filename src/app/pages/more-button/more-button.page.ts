import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-more-button',
  templateUrl: './more-button.page.html',
  styleUrls: ['./more-button.page.scss'],
})
export class MoreButtonPage implements OnInit {

  constructor(private router: Router,
              public popoverController: PopoverController) { }

  ngOnInit() {
  }

  createHive() {
    console.log('TEST');
    this.router.navigateByUrl('hive-form');
    this.popoverController.dismiss();

  }

}
