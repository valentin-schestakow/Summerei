import {Component} from '@angular/core';

import {NavController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {timer} from 'rxjs/observable/timer';
import {FireAuthService} from './services/fire-auth.service';
import {Router} from '@angular/router';
import {FireDbService} from './services/fire-db.service';
import {LocalDbService} from './services/local-db.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {error} from 'selenium-webdriver';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ];

    // showSplash: boolean = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fireAuth: FireAuthService,
        private fireDb: FireDbService,
        private router: Router,
        private toastController: ToastController,
        private localDbService: LocalDbService,
        private navCtrl: NavController,
        private oneSignal: OneSignal,
        private localDb: LocalDbService) {

        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.localDb.getHives();
            timer(500).subscribe(() => this.splashScreen.hide());

            if(this.platform.is('mobile')) {
                this.setupPush();
            }
        });
    }

    // private handleLogin() {
    //
    //     this.oneSignal.getIds().then((ids) => {
    //         this.localDbService.savePushId(ids.userId);
    //     });
    //
    //     this.localDbService.checkIfUserIsLoggedIn().then((data) => {
    //         this.localDbService.getWeatherData();
    //         this.fireAuth.login(data.email, data.password)
    //             .then(() => {
    //                 this.fireAuth.getCurrentUser();
    //                 this.router.navigateByUrl('menu');
    //                 timer(1000).subscribe(() => this.splashScreen.hide());
    //             }).catch(() => {
    //             timer(1000).subscribe(() => this.splashScreen.hide());
    //         });
    //     }).catch(() => {
    //         timer(1000).subscribe(() => this.splashScreen.hide());
    //     });
    //
    // }

    setupPush() {

        this.oneSignal.startInit('6301b69e-0bff-4f5c-9253-33dceae2bce6', '991837098985');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.getIds().then((ids) => {
            this.localDbService.savePushId(ids.userId);
        });

        this.oneSignal.handleNotificationReceived().subscribe((data) => {
            // this.presentToast('notification received');
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {

        });

        this.oneSignal.endInit();
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }


}

