import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import {HiveListComponent} from './hive-list/hive-list.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [SpinnerComponent, HiveListComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [SpinnerComponent, HiveListComponent]
})
export class ComponentsModule {}
