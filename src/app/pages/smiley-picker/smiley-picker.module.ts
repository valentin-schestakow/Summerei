import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SmileyPickerPage } from './smiley-picker.page';

const routes: Routes = [
  {
    path: '',
    component: SmileyPickerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SmileyPickerPage]
})
export class SmileyPickerPageModule {}
