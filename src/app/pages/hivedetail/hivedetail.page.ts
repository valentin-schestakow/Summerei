import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hive} from '../../model/hive.model';
import {FireDbService} from '../../services/fire-db.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-hivedetail',
    templateUrl: './hivedetail.page.html',
    styleUrls: ['./hivedetail.page.scss'],
})
export class HivedetailPage implements OnInit {

    hive: Hive = new Hive();
    private hiveId: string;
    names: string[] = [];

    selectedPage: string = "hive";


    constructor(private route: ActivatedRoute,
                public router: Router,
                private fireDb: FireDbService,
                private navCtrl: NavController,
                private alertController: AlertController) {
        this.hiveId = this.route.snapshot.paramMap.get('hiveId');
        if (this.hiveId) {
            this.fireDb.hivesObservable.subscribe(() => {
                Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
                this.getStringofUserNames();
            });
            Object.assign(this.hive, this.fireDb.findHiveById(this.hiveId));
            this.getStringofUserNames();
        }

    }

    ngOnInit() {
    }

    back() {
        this.navCtrl.pop();
    }

    deleteHive() {
        this.deleteDialog();
    }

    editHive() {
        this.router.navigate(['hive-form', {hiveId: this.hiveId}]);
    }

    async deleteDialog() {
        const alert = await this.alertController.create({
            header: 'Sind Sie sich wirklich, dass Sie das Volk ' + '"' + this.hive.name + '"' + ' endgültig löschen möchten?',
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    cssClass: 'cancelButton',
                },
                {
                    text: 'Ja',
                    cssClass: 'confirmButton',
                    handler: () => {
                        this.fireDb.deleteHive(this.hiveId);
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        await alert.present();
    }

    getStringofUserNames() {
        this.names.length = 0;
        for (let i = 0; i < this.hive.memberNames.length; i++) {
            this.names.push(' ' + this.hive.memberNames[i]);
        }
    }

    createHiveCard() {
        this.router.navigate(['hive-card-form', {hiveId: this.hiveId}]);
    }
}
