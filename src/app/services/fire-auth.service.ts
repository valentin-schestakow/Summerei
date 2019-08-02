import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {User} from '../model/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Network} from '@ionic-native/network/ngx';
import {LocalDbService} from './local-db.service';
import {plainToClass} from 'class-transformer';
import {Settings} from '../model/settings.model';

@Injectable({
    providedIn: 'root'
})
export class FireAuthService {

    public currentUser: any;
    public isLoggedIn: boolean;
    public username: string = '';
    public uid: string = 'unset';
    public email: string;
    public networkStatus: string = '';
    public user: User;

    private password: string;


    constructor(private fireAuth: AngularFireAuth,
                private router: Router,
                private db: AngularFirestore,
                private network: Network,
                private localDbService: LocalDbService,
                private toastController: ToastController,) {

    }

    async register(email: string, password: string, username?: string): Promise<boolean> {


        return  await this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                // console.log(data);
                this.currentUser = data.user;
                if (this.currentUser) {
                    this.email = email;
                    this.password = password;
                    this.username = username;
                    this.uid = this.currentUser.uid;
                    this.isLoggedIn = true;

                    this.getCurrentUser();
                    this.createUser();
                    this.addSettings();

                    return Promise.resolve(true);
                }
            }).catch(error => {
                // this.presentToast(error);
                return Promise.reject(false);
                console.log(error);
            });
    }

    async login(email: string, password: string): Promise<boolean> {

        return await this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(data => {

                this.currentUser = data.user;

                if (this.currentUser) {
                    this.uid = this.currentUser.uid;
                    this.email = email;
                    this.password = password;
                    this.isLoggedIn = true;

                    this.getCurrentUser();
                    this.addSettings();
                    return Promise.resolve(true);
                }

            }).catch(error => {
                return Promise.reject(false);
            });
    }

    async getCurrentUser() {
        return await this.db.collection('user').doc(this.uid).valueChanges().subscribe((user: User) => {
            this.user = plainToClass(User, user);
            this.localDbService.saveLoginLocal(user.email,this.password,user.id,user.name);
        });
    }


    private createUser() {
        let user: User = new User();
        user.email = this.email;
        user.id = this.uid;
        user.name = this.username;

        console.log(user);

        this.db.collection('user').doc(this.uid).set(JSON.parse(JSON.stringify(user)))
            .then(data => {
                console.log(data);
            }).catch(error => {
            console.log(error);
        });
    }

    handleNetwork() {

        this.network.onConnect().subscribe((data) => {
            this.networkStatus = 'connencted';
            this.presentToast('connect');
            // this.presentToast('inet true');
            // this.localDbService.getLocalLogin().then((loginData) => {
            //     //gespeicherte logindaten
            //     this.presentToast(loginData.email);
            // }).catch((error) => {
            //     //keine Logindaten gespeichert
            //     this.presentToast('error loading loginData');
            // })
        });

        this.network.onDisconnect().subscribe((data) => {
            this.networkStatus = 'disconnected';
            this.presentToast('inet false');
            // console.log(data);
        });
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 20000,
            position: 'top',
        });
        toast.present();
    }


    private addSettings() {

        this.localDbService.getUserSettings()
            .catch(() => {
                this.getCurrentUser();
                let settings: Settings = new Settings('listView', true, true);
                this.localDbService.setSettings(settings);
            });
    }


    logout() {
        this.localDbService.clearLocalStorage();
        this.router.navigateByUrl('login');
    }


    //@TODO kann man machen, muss aber vorerst nicht sein
    deleteAccount() {

    }
}
