import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HiveFormPage } from './hive-form.page';
import {ComponentsModule} from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: HiveFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
    declarations: [HiveFormPage]
})
export class HiveFormPageModule {}
