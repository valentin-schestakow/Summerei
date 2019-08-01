import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartLoadingPage } from './start-loading.page';
import {LoadingScreenComponent} from '../../components/loading-screen/loading-screen.component';

const routes: Routes = [
  {
    path: '',
    component: StartLoadingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StartLoadingPage, LoadingScreenComponent]
})
export class StartLoadingPageModule {}
