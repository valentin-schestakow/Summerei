import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';
import {LocalDbService} from '../../services/local-db.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  email: string;
  password: string;
  passwordCofirm: string;
  username: string;

  /**
   *
   *
   * @param navctrl
   * @param authService
   * @param router
   * @param toastController
   * @param localDbService
   */
  constructor(public navctrl: NavController,
              public authService: FireAuthService,
              public router: Router,
              public toastController: ToastController,
              private localDbService: LocalDbService) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * will create a firebase Account and route to main page if succeeded
   */
  createAccount () {

    if (this.password === this.passwordCofirm) {
      this.authService.register(this.email, this.password, this.username).then(() => {
        this.router.navigateByUrl("menu");
      }).catch(() => {
        this.presentToast();
      })
    } else {
      // console.log("Passwörter stimmen nicht überein!")
    }

  }

  /**
   * routes back to login page
   */
  back() {
    this.navctrl.pop();
  }

  /**
   * @ignore
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Die Login Daten stimmen leider nicht!.',
      duration: 2000
    });
    toast.present();
  }
}
