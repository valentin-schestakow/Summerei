import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {AlertController} from '@ionic/angular';
import {LocalDbService} from './local-db.service';
import {FireDbService} from './fire-db.service';


@Injectable({
    providedIn: 'root'
})
export class PushService {

    constructor(private http: HttpClient,
                private oneSignal: OneSignal,
                private alertController: AlertController,
                private localDb: LocalDbService,) {
    }

    static ONESIGNAL_URL = 'https://onesignal.com/api/v1/notifications';




    postNotificationToGroup(ids: string[], header: string, content: string) {

        const body = {
            app_id: '6301b69e-0bff-4f5c-9253-33dceae2bce6',
            include_player_ids: ids,
            // included_segments: ["Active Users"],
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


    async anyDialog(msg: string) {
        const alert = await this.alertController.create({
            header: msg,
        });
        await alert.present();
    }



    // sendPostRequest() {
    //     let postData = {
    //         app_id: '6301b69e-0bff-4f5c-9253-33dceae2bce6',
    //         contents: {en: 'English Message'},
    //         included_segments: ['All']
    //     };
    //
    //     this.http.post(PushService.ONESIGNAL_URL, postData, {
    //         headers: {
    //             ContentType: 'application/json; charset=utf-8',
    //             Authorization: 'NjIyZmZiMTgtYjUyYi00MGE3LWE1Y2UtZmI2Y2Q5NTBiYmYw'
    //         }
    //     })
    //         .subscribe(data => {
    //             console.log(data);
    //         }, error => {
    //             console.log(error);
    //         });
    // }
}
