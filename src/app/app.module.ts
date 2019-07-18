import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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
import {DatePicker} from '@ionic-native/date-picker/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClientModule} from '@angular/common/http';

import {SmileyPickerPageModule} from './pages/smiley-picker/smiley-picker.module';
import {RouteReuseStrategy} from '@angular/router';
import {FireDbService} from './services/fire-db.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      MenuPageModule,
      NgbModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule,
      MoreButtonPageModule,
      ColorPickerPageModule,
      SmileyPickerPageModule,

    ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Geolocation,
    FireDbService,
    SpinnerComponent,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

