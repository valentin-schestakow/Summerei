import {Component, OnInit, ViewChild} from '@angular/core';
import {FireDbService} from '../../services/fire-db.service';
import {Hive} from '../../model/hive.model';
import {AlertController, IonSelect, NavController, ToastController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})


/**
 * page to send invite codes to a given hive or to join one
 */
export class InvitePage implements OnInit {

  showSpinner: boolean = false;
  private hives: Hive[] = [];
  private redeemCode: string;
  @ViewChild('hive')
  private selectedHiveRef: IonSelect;


  /**
   * retrieves current available hives
   *
   * @param fireDb
   * @param navCtrl
   * @param socialSharing
   * @param toastController
   * @param alertCtrl
   */
  constructor(private fireDb: FireDbService,
              private navCtrl: NavController,
              private socialSharing: SocialSharing,
              private toastController: ToastController,
              private alertCtrl: AlertController,) {
    this.hives = this.fireDb.hives;
  }


  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * used to redeem a code to join a hive
   */
  redeemButton() {
    if (this.redeemCode !== "" && this.redeemCode !== null && this.redeemCode !== undefined) {
      this.showSpinner = true;
      this.fireDb.redeemInviteCode(this.redeemCode).then(() => {
        this.showSpinner = false;
        this.navCtrl.pop();
      }).catch(() => {
        this.showSpinner = false;
      })
    } else {
      console.log('error')
    }
  }

  /**
   *
   * @ignore
   */
  generateButton() {
    if (this.selectedHiveRef.value !== "" && this.selectedHiveRef.value !== null && this.selectedHiveRef.value !== undefined) {
      this.chooseShareMethodDialog();
    } else {
      console.log('error while selecting')
    }
  }


  /**
   * used to share invite code via mail
   */
  shareViaMail() {
    this.socialSharing.canShareViaEmail()
        .then(() => {

          this.emailShareDialog().then(() => {
            this.presentToast('E-Mail wurde versandt');
          });
        }).catch((err) => {
      this.presentToast(err);
    });
  }


  /**
   * alert in which a user can choose between e-mail and whatsapp to share a invite code
   */
   async chooseShareMethodDialog() {
    const alert = await this.alertCtrl.create({
      header: 'Wie wollen Sie senden?',
      buttons: [
        {
          text: 'E-Mail',
          cssClass: 'secondConfirmButton',
          handler: () => {
            this.emailShareDialog();
          }
        },
        {
          text: 'WhatsApp',
          cssClass: 'confirmButton',
          handler: () => {
            this.shareViaWhatsApp('Volkeinladungscode: ' + this.selectedHiveRef.value);
          }
        },
        {
          text: 'schließen',
          role: 'cancel',
          cssClass: 'cancelButton',
        },
      ]
    });
    await alert.present();
  }

  /**
   * retrieves user input for receiver of the mail and the corresponding message
   */
 async emailShareDialog() {
   const alert = await this.alertCtrl.create({
     header: 'Email senden',
     inputs: [
       {
         name: 'email',
         type: 'text',
         id: 'email',
         placeholder: 'Email des Empfängers'
       },
       {
         name: 'msg',
         type: 'text',
         id: 'msg',
         placeholder: 'Nachricht an den Empfänger'
       }],
     buttons: [
       {
         text: 'schließen',
         role: 'cancel',
         cssClass: 'cancelButton',
       },
       {
         text: 'senden',
         cssClass: 'confirmButton',
         handler: (data) => {
           this.socialSharing.shareViaEmail(data.msg, 'Volkeinladungscode: ' + this.selectedHiveRef.value, [data.email])
               .then(() => {
                 this.back();
               });
         }
       }
     ]
   });
   await alert.present();
  }

  /**
   * opens whats app
   *
   * @param msg
   */
  shareViaWhatsApp(msg: string) {
    this.socialSharing.canShareVia('whatsapp')
        .then(() => {
          this.socialSharing.shareViaWhatsApp(msg)
              .then(() => {
                // this.presentToast('whatsApp geht!');
                this.back();
              }).catch((err) => {
            this.presentToast(err);
          })

        }).catch((err) => {
          this.presentToast(err);
        })
  }


  /**
   *
   * @ignore
   */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: 'TOAST: ' + msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  /**
   * routes back
   */
  back() {
    this.navCtrl.pop();
  }
}
