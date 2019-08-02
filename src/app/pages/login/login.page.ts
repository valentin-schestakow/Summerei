import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {LocalDbService} from '../../services/local-db.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

/**
 * page to login
 */
export class LoginPage implements OnInit {

  email: string;
  password: string;

  /**
   *
   * @param authService
   * @param router
   * @param toastController
   */
  constructor(private authService: FireAuthService,
              private router: Router,
              private toastController: ToastController,) {
    }

  /**
   *
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * method which takes user input and attempts a login with those
   */
  login() {
    this.authService.login(this.email, this.password).then(() => {
      // this.localDbService.saveLoginLocal(this.email, this.password, this.authService.uid);
      this.router.navigateByUrl("menu");
    }).catch(() => {
      this.presentToast();
    });
  }

  /**
   * used to route to registration page
   */
  createAccount() {
    this.router.navigateByUrl("authentication")
  }

  /**
   *
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
