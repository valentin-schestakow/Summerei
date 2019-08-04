import {Component, OnInit} from '@angular/core';
import {LocalDbService} from '../../services/local-db.service';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-start-loading',
    templateUrl: './start-loading.page.html',
    styleUrls: ['./start-loading.page.scss'],
})

/**
 * this is used bridge loading time corresponding to loading mandatory user data
 */
export class StartLoadingPage implements OnInit {

    /**
     *
     * @param localDb
     * @param fireAuth
     * @param router
     * @param toastController
     */
    constructor(private localDb: LocalDbService,
                private fireAuth: FireAuthService,
                private router: Router,
                private toastController: ToastController) {
    }

    /**
     * loading mandatory user data and routes to main page if those are given
     */
    ngOnInit() {
        this.localDb.getUserSettings();
        this.localDb.checkIfUserIsLoggedIn()
            .then((user) => {
                this.router.navigateByUrl('menu');
                this.fireAuth.uid = user.id;
                this.fireAuth.login(user.email, user.password);

            }).catch(() => {
            this.router.navigateByUrl('login');
        });
    }


    /**
     *
     * @ignore
     */
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
        });
        toast.present();
    }

}
