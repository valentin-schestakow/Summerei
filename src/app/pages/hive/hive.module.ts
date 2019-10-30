import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HivePage} from './hive.page';

const routes: Routes = [
    {
        path: 'hive',
        component: HivePage,
        children: [
                {path: 'entry', loadChildren: '../entry/entry.module#EntryPageModule'},
                {path: 'hivedetail', loadChildren: '../hivedetail/hivedetail.module#HivedetailPageModule'},
            ]
    },
    {path: '', redirectTo: '/hive/hivedetail', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        // TabsPageRoutingModule,
        RouterModule.forChild(routes)
    ],
    exports: [HivePage],
    declarations: [HivePage]
})
export class HivePageModule {
}
