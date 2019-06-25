import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public authService: FireAuthService,
              public router: Router,
              public toastController: ToastController,) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigateByUrl("main");
    }).catch(() => {
      this.presentToast();
    });
  }

  createAccount() {
    this.router.navigateByUrl("authentication")
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Die Login Daten stimmen leider nicht!.',
      duration: 2000
    });
    toast.present();
  }
}
