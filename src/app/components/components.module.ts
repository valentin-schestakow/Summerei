import { NgModule } from '@angular/core';
import {HiveListComponent} from './hive-list/hive-list.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {SliderItemComponent} from './slider-item/slider-item.component';
import {WeatherComponent} from './weather/weather.component';
import {SpinnerComponent} from './spinner/spinner.component';

/**
 * @ignore
 */
@NgModule({
    declarations: [ HiveListComponent, SliderItemComponent, WeatherComponent, SpinnerComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [ SpinnerComponent ,HiveListComponent, SliderItemComponent, WeatherComponent]
})
/**
 * @ignore
 */
export class ComponentsModule {}
