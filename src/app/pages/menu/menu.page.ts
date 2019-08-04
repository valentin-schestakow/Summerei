import {Component} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {LocalDbService} from '../../services/local-db.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})

/**
 * used to handle menu routing logic
 */
export class MenuPage {

    /**
     * available pages to route to
     */
    pages = [
        {title: 'Einstellungen', url: '/menu/settings'},
        {title: 'Abmelden', url: ''}
    ];

    selectedPath = '';


    /**
     *
     * @param router
     * @param toastController
     * @param alertController
     * @param localDbService
     */
    constructor(private router: Router,
                private toastController: ToastController,
                private alertController: AlertController,
                private localDbService: LocalDbService) {

        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        });
    }

    /**
     * @ignore
     */
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }

    /**
     * self explanatory
     */
    route(p: { title: string; url: string }) {
        if (p.title == 'Abmelden') {
            this.logoutDialog();
        } else {
            this.router.navigateByUrl(p.url);
        }
    }


    /**
     * asks users if he/she really wants to log out
     */
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



