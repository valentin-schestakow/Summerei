import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {LocalDbService} from '../../services/local-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: FireAuthService,
              private router: Router,
              private toastController: ToastController,
              private localDbService: LocalDbService) {

    if(this.authService.isLoggedIn) {
      this.router.navigateByUrl('menu');
    }

    this.authService.login("t@t.de","123456").then(() => {
      this.router.navigateByUrl("menu");
    })
    // this.authService.handleLogin();
    }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      // this.localDbService.saveLoginLocal(this.email, this.password, this.authService.uid);
      this.router.navigateByUrl("menu");
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
