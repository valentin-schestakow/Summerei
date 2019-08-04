import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {AlertController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})

/**
 * handles push notifications
 */
export class PushService {

    /**
     *
     * @param http
     * @param oneSignal
     * @param alertController
     */
    constructor(private http: HttpClient,
                private oneSignal: OneSignal,
                private alertController: AlertController,) {
    }


    /**
     * api url
     */
    static ONESIGNAL_URL = 'https://onesignal.com/api/v1/notifications';
    /**
     * @ignore
     */
    static APP_ID = "6301b69e-0bff-4f5c-9253-33dceae2bce6";


    /**
     * post request to create a push notification
     *
     * @param ids push ids of devices which will receive this notification
     * @param header header of the notification
     * @param content content of the notification
     */
    postNotificationToGroup(ids: string[], header: string, content: string) {

        const body = {
            app_id: '6301b69e-0bff-4f5c-9253-33dceae2bce6',
            include_player_ids: ids,
            contents: {
                en: header
            },
            headings: {
                en: content
            }
        };
        this.http.post(PushService.ONESIGNAL_URL, body).subscribe(data => {
            // this.anyDialog('success');
        }, error => {
            // this.anyDialog('error');
        });
    }


    /**
     * @ignore
     */
    async anyDialog(msg: string) {
        const alert = await this.alertController.create({
            header: msg,
        });
        await alert.present();
    }
}
