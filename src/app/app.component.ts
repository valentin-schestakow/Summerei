import {Component} from '@angular/core';

import {NavController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {timer} from 'rxjs/observable/timer';
import {FireAuthService} from './services/fire-auth.service';
import {Router} from '@angular/router';
import {FireDbService} from './services/fire-db.service';
import {LocalDbService} from './services/local-db.service';

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
        private navCtrl: NavController) {

        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            // this.splashScreen.hide();
            this.handleLogin();
        });
    }

    private handleLogin() {
        this.localDbService.checkIfUserIsLoggedIn().then((data) => {
            this.fireAuth.login(data.email, data.password)
                .then(() => {
                    this.router.navigateByUrl('menu');
                    timer(1000).subscribe(() => this.splashScreen.hide());
                }).catch(() => {
                timer(1000).subscribe(() => this.splashScreen.hide());
            });
        }).catch(() => {
            timer(1000).subscribe(() => this.splashScreen.hide());
        });
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

