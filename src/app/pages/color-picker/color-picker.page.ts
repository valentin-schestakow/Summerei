import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
})
export class ColorPickerPage implements OnInit {


  constructor(public popoverController: PopoverController,) { }

  ngOnInit() {
  }



  choose(color: string) {
    this.popoverController.dismiss(color);
  }

}
