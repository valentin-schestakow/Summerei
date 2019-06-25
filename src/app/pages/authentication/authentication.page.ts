import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {FireAuthService} from '../../services/fire-auth.service';
import {Router} from '@angular/router';

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

  constructor(public navctrl: NavController,
              public authService: FireAuthService,
              public router: Router,
              public toastController: ToastController,) { }

  ngOnInit() {
  }

  createAccount () {

    if (this.password === this.passwordCofirm) {
      this.authService.register(this.email, this.password, this.username).then(() => {
        this.router.navigateByUrl("main");
      }).catch(() => {
        this.presentToast();
      })
    } else {
      // console.log("Passwörter stimmen nicht überein!")
    }

  }

  back() {
    this.navctrl.pop();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Die Login Daten stimmen leider nicht!.',
      duration: 2000
    });
    toast.present();
  }
}
