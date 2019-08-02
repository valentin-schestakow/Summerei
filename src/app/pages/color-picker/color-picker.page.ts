import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
})

/**
 * page to select a queen bee color
 */
export class ColorPickerPage implements OnInit {


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
   * dismisses this popover and by so returns the selected color back to hive form page
   *
   * @param color color which was selected
   */
  choose(color: string) {
    this.popoverController.dismiss(color);
  }

}
