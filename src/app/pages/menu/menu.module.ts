import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
      children: [
          { path: 'main', loadChildren: '../main/main.module#MainPageModule'},
      ]
  }, {path: '', redirectTo :'/menu/main', pathMatch: 'full',}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        MenuPage
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {}
