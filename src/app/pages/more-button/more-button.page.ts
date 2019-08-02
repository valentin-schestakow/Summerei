import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-more-button',
  templateUrl: './more-button.page.html',
  styleUrls: ['./more-button.page.scss'],
})

/**
 * page for the more button popover
 */
export class MoreButtonPage implements OnInit {

  constructor(private router: Router,
              public popoverController: PopoverController) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * routes to hive-form page to create a new hive
   */
  createHive() {
    this.router.navigateByUrl('hive-form');
    this.popoverController.dismiss();

  }

  /**
   * routes to invite page
   */
  invitePage() {
    console.log('invite');
    this.router.navigateByUrl('invite');
    this.popoverController.dismiss();
  }
}
