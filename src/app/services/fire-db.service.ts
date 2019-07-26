import {Injectable} from '@angular/core';
import {Hive} from '../model/hive.model';
import {Hivecard} from '../model/hive-card.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {FireAuthService} from './fire-auth.service';

import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;
import {Subject} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {ToastController} from '@ionic/angular';
import {promise} from 'selenium-webdriver';


@Injectable({
    providedIn: 'root'
})
export class FireDbService {

    constructor(private firebaseFirestore: AngularFirestore,
                private fireAuth: FireAuthService,
                private toastController: ToastController) {
    }

    public hives: Hive[] = [];
    public hivecards: Hivecard[] = [];

    private hivesSubject = new Subject<Hive[]>();
    public hivesObservable = this.hivesSubject.asObservable();

    public setHives(hives: Hive[]) {
        this.hives = hives;
        this.hivesSubject.next(hives);
    }


    async listenHivesOfCurrentUser() {

        return await this.firebaseFirestore.collection('hive', ref => ref.where('members', 'array-contains', this.fireAuth.uid + '')).valueChanges().subscribe((hives: Hive[]) => {
            let tempHives: Hive[] = [];
            hives.forEach((hive) => {
                tempHives.push(plainToClass(Hive, hive));
            });
            this.setHives(tempHives);
            // console.log('tempHives[0].name');
        });
    }

    createHive(hive: Hive) {
        hive.id = this.firebaseFirestore.createId();
        hive.adminId = this.fireAuth.uid;
        hive.creationDate = new Date().toISOString();
        hive.adminName = this.fireAuth.user.name;
        // hive.state = 'good';
        //
        // let today = new Date();
        // let dd = String(today.getDate()).padStart(2, '0');
        // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // let yyyy = today.getFullYear();
        // let stringToday = dd + '.' + mm + '.' + yyyy;
        // 0;
        // hive.creationDate = stringToday;

        let members: string[] = [];
        members.push(this.fireAuth.uid);
        hive.members = members;

        let memberNames: string[] = [];
        memberNames.push(this.fireAuth.user.name);
        hive.memberNames = memberNames;

        let hivecards: Hivecard[] = [];
        hive.hivecards = hivecards;

        this.firebaseFirestore.collection('hive').doc(hive.id).set(JSON.parse(JSON.stringify(hive)))
            .then((ret) => {
                console.log(ret);
            }).catch((error) => {
            console.log(error);
        });
    }

    addHivecardToHive(hiveId: string, hiveCard: Hivecard) {
        let tempCards: Hivecard[] = this.hives.find(hive => isHive(hiveId, hive)).hivecards;
        tempCards.push(hiveCard);

        this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: JSON.parse(JSON.stringify(tempCards))});
    }

    deleteHivecard(hiveId: string, hivecardId: string) {
        let tempCards: Hivecard[] = this.hives.find(hive => isHive(hiveId, hive)).hivecards;
        for (let i = 0; i < tempCards.length; i++) {
            if (tempCards[i].id == hivecardId) {
                tempCards.splice(i, 1);
                break;
            }
        }

        this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: tempCards});
    }

    deleteHive(hiveId: string) {
        this.firebaseFirestore.collection('hive').doc(hiveId).delete();
    }

    findHiveById(id: string): Hive {
        return this.hives.find(h => h.id == id);
    }

    findAllHiveCards(): Hivecard[] {
        this.hivecards = [];
        this.hives.forEach(hive => {
            hive.hivecards.forEach(card => {
                this.hivecards.push(card);
            });
        });
        return this.hivecards;
    }

    findHivecardById(hiveId: string, hivecardId: string) {
        let tempHive: Hive = this.findHiveById(hiveId);
        return tempHive.hivecards.find(card => card.id == hivecardId);
    }

    updateHivecard(hiveId: string, hivecardId: string, newHivecard: Hivecard) {
        let hiveIndex: number = this.hives.findIndex(hive => hive.id == hiveId);
        let hiveCardIndex: number = this.hives[hiveIndex].hivecards.findIndex(card => card.id == hivecardId);
        this.hives[hiveIndex].hivecards[hiveCardIndex] = newHivecard;
        this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: JSON.parse(JSON.stringify(this.hives[hiveIndex].hivecards))});
    }

    updateHive(hive: Hive) {
        this.firebaseFirestore.collection('hive').doc(hive.id).set(JSON.parse(JSON.stringify(hive)));
    }

    redeemInviteCode(key: string) {
        this.firebaseFirestore.collection('hive').doc(key).update({'memberNames': FieldValue.arrayUnion(this.fireAuth.user.name)});
        return this.firebaseFirestore.collection('hive').doc(key).update({'members': FieldValue.arrayUnion(this.fireAuth.uid)});
    }


    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

}

function isHive(hiveId: string, hive: Hive) {
    return hive.id === hiveId;
}

function isHiveCard(hivecradId: string, hivecard: Hivecard) {
    return hivecard.id === hivecradId;
}
