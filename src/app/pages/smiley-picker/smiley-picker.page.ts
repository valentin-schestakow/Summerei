import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-smiley-picker',
  templateUrl: './smiley-picker.page.html',
  styleUrls: ['./smiley-picker.page.scss'],
})
export class SmileyPickerPage implements OnInit {

  constructor(public popoverController: PopoverController,) { }

  ngOnInit() {
  }

  choose(state: string) {
    this.popoverController.dismiss(state);
  }
}
