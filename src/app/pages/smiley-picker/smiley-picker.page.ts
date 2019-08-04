import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-smiley-picker',
  templateUrl: './smiley-picker.page.html',
  styleUrls: ['./smiley-picker.page.scss'],
})

/**
 * page used to select a smiley from popover which are used to distinguish a hives state
 */
export class SmileyPickerPage implements OnInit {

  /**
   *
   * @param popoverController
   */
  constructor(public popoverController: PopoverController,) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * returns selected value to parent view and dismisses this popover
   *
   * @param state
   */
  choose(state: string) {
    this.popoverController.dismiss(state);
  }
}
