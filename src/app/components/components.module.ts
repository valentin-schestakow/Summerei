import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import {HiveListComponent} from './hive-list/hive-list.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {SliderItemComponent} from './slider-item/slider-item.component';

@NgModule({
    declarations: [SpinnerComponent, HiveListComponent, SliderItemComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [SpinnerComponent, HiveListComponent, SliderItemComponent]
})
export class ComponentsModule {}
