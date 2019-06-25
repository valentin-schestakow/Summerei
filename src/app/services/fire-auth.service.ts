import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {User} from '../model/user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  public currentUser: any;
  public isLoggedIn: boolean = false;


  private email: string;
  private password: string;
  private username: string = "";
  private uid: string;

  constructor(private fireAuth: AngularFireAuth,
              public router: Router,
              private db: AngularFirestore,) {

  }

  async register(email: string, password: string, username?: string): Promise<boolean> {

    let ret: boolean = false;

    await this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(data =>{
          // console.log(data);
          this.currentUser = data.user;
          if (this.currentUser) {
              this.email = email;
              this.password = password;
              this.username = username;
              this.uid = this.currentUser.uid;
              this.isLoggedIn = true;
              ret = true;
              this.createUser();
          }
        }).catch(error => {
          console.log(error);
        });

    if (ret) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }

  }

  async login (email: string, password: string): Promise<boolean>{

    let ret: boolean = false;

    await this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => {

          this.currentUser = data.user;
            if (this.currentUser) {
                this.isLoggedIn = true;
                ret = true;
            }

        }).catch(error => {
          console.log(error);

        });


    if (ret) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  }


    private createUser() {
        let user: User = new User();
        user.email = this.email
        user.id = this.uid;
        user.name = this.username;
        let hives: string[] = []
        user.hives = hives;

        this.db.collection('user').doc(this.uid).set(JSON.parse(JSON.stringify(user)))
            .then(data => {
                console.log(data);
            }).catch(error => {
            console.log(error);
        });
    }


  logout() {

  }

  //@TODO kann man machen, muss aber vorerst nicht sein
  deleteAccount() {

  }
}
