import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MenuPageModule} from './pages/menu/menu.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MoreButtonPageModule} from './pages/more-button/more-button.module';
import {ColorPickerPageModule} from './pages/color-picker/color-picker.module';
import {DatePickerOriginal} from '@ionic-native/date-picker';
import {DatePicker} from '@ionic-native/date-picker/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      MenuPageModule,
      NgbModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule,
      MoreButtonPageModule,
      ColorPickerPageModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

