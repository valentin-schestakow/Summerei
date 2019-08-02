import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {LocalDbService} from '../../services/local-db.service';
import {error} from 'selenium-webdriver';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

    pages = [
        {title: 'Einstellungen', url: '/menu/settings'},
        {title: 'Abmelden', url: ''}
    ];

    selectedPath = '';


    constructor(private router: Router,
                private toastController: ToastController,
                private alertController: AlertController,
                private localDbService: LocalDbService,
                private navCtrl: NavController) {

        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
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

    route(p: { title: string; url: string }) {
        if (p.title == 'Abmelden') {
            this.logoutDialog();
        } else {
            this.router.navigateByUrl(p.url);
        }
    }


    async logoutDialog() {
        const alert = await this.alertController.create({
            header: 'Wollen Sie sich wirklich abmelden?',
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    cssClass: 'cancelButton',
                },
                {
                    text: 'Ja',
                    cssClass: 'confirmButton',
                    handler: () => {
                        this.localDbService.clearLocalStorage();
                        navigator['app'].exitApp();
                        // this.router.navigateByUrl('login');
                    }
                }
            ]
        });
        await alert.present();
    }

}



