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
export class StartLoadingPage implements OnInit {

    constructor(private localDb: LocalDbService,
                private fireAuth: FireAuthService,
                private router: Router,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.localDb.getUserSettings();
        this.localDb.checkIfUserIsLoggedIn()
            .then((user) => {
                // this.localDb.getHives().then(() => {
                // }).catch(() => {
                // });
                this.router.navigateByUrl('menu');
                this.fireAuth.uid = user.id;
                this.fireAuth.login(user.email, user.password);

            }).catch(() => {
            this.router.navigateByUrl('login');
        });
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
        });
        toast.present();
    }

}
