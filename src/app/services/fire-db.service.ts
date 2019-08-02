import {Injectable} from '@angular/core';
import {Hive} from '../model/hive.model';
import {Hivecard} from '../model/hive-card.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {FireAuthService} from './fire-auth.service';
import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;
import {Subject, timer} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {ToastController} from '@ionic/angular';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {LocalDbService} from './local-db.service';
import {PushService} from './push.service';
import {DatePipe} from '@angular/common';



@Injectable({
    providedIn: 'root'
})

/**
 * this service is for all AngularFirestore functions
 */
export class FireDbService {

    constructor(private firebaseFirestore: AngularFirestore,
                private fireAuth: FireAuthService,
                private toastController: ToastController,
                private oneSignal: OneSignal,
                private localDb: LocalDbService,
                private pushService: PushService,
                private datePipe: DatePipe) {
    }

    public hives: Hive[] = [];
    public hivecards: Hivecard[] = [];

    private hivesSubject = new Subject<Hive[]>();
    public hivesObservable = this.hivesSubject.asObservable();

    public setHives(hives: Hive[]) {
        this.hives = hives;
        this.hivesSubject.next(hives);
    }


    /**
     * used subscribe to value changes of all hives the current is a member of.
     * also mirrors all data to native storage
     */
    async listenHivesOfCurrentUser() {

        return await this.firebaseFirestore.collection('hive', ref => ref.where('members', 'array-contains', this.fireAuth.uid + '')).valueChanges().subscribe((hives: Hive[]) => {
            let tempHives: Hive[] = [];
            hives.forEach((hive) => {
                tempHives.push(plainToClass(Hive, hive));
            });

            this.setHives(tempHives);
            this.localDb.saveHives(tempHives)
                .then(
                    () => console.log(),
                    () => this.presentToast('Fehler Beim speichern der Daten')
                );
        });
    }

    /**
     * used to create a hive in firestore
     *
     * @param hive given hive object to push in firestore
     */
    createHive(hive: Hive) {

        let tempPushIds: string [] = [];
        tempPushIds.push(this.localDb.pushId);
        hive.pushIds = tempPushIds;

        if(hive.id == "") {
            hive.id = this.firebaseFirestore.createId();
        }


        hive.adminId = this.fireAuth.uid;
        hive.creationDate = new Date().toISOString();
        hive.adminName = this.fireAuth.user.name;

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

    /**
     * used to push a hivecard object t o given hive
     *
     * @param hiveId id of given hive
     * @param hiveCard hivecard object to add
     */
    addHivecardToHive(hiveId: string, hiveCard: Hivecard) {

        let hive = this.findHiveById(hiveId);
        let ids: string[] = hive.pushIds;
        ids.splice(ids.indexOf(this.localDb.pushId),1);
        let name: string = hive.name;
        let editor: string = this.fireAuth.user.name;

        this.pushService.postNotificationToGroup(ids, 'Eintrag in '+name, editor+' hat einen neuen Eintrag getätigt!');

        let tempCards: Hivecard[] = this.hives.find(hive => isHive(hiveId, hive)).hivecards;
        tempCards.push(hiveCard);

        this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: JSON.parse(JSON.stringify(tempCards))});
    }

    /**
     * deletes a hivecard from a given hive
     *
     * @param hiveId id of given hive
     * @param hivecardId id of given hivecard
     */
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

    /**
     * deletes a hive
     *
     * @param hiveId id of hive to delete
     */
    deleteHive(hiveId: string) {
        this.firebaseFirestore.collection('hive').doc(hiveId).delete();
    }

    /**
     * used to find a hive by id
     *
     * @param id
     */
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

    /**
     * used to a hivecard by id
     *
     * @param hiveId id of hive in which the hivecard of interest is saved
     * @param hivecardId id of searched hivecard
     */
    findHivecardById(hiveId: string, hivecardId: string) {
        let tempHive: Hive = this.findHiveById(hiveId);
        return tempHive.hivecards.find(card => card.id == hivecardId);
    }

    /**
     * updates a hivecard
     *
     * @param hiveId
     * @param hivecardId
     * @param newHivecard
     */
    updateHivecard(hiveId: string, hivecardId: string, newHivecard: Hivecard) {

        let hiveIndex: number = this.hives.findIndex(hive => hive.id == hiveId);
        let hiveCardIndex: number = this.hives[hiveIndex].hivecards.findIndex(card => card.id == hivecardId);
        this.hives[hiveIndex].hivecards[hiveCardIndex] = newHivecard;

        let date: string = this.datePipe.transform(this.hives[hiveIndex].hivecards[hiveCardIndex].creationDate,"dd-MM-yyyy");

        let idsOfOthermMmbers: string[] =[];
        this.hives[hiveIndex].pushIds.forEach((id) => {
            if(id !== this.localDb.pushId) {
                idsOfOthermMmbers.push(id);
            }
        });
        let name: string = this.hives[hiveIndex].name;
        let editor: string = this.fireAuth.user.name;
        this.pushService.postNotificationToGroup(idsOfOthermMmbers, 'Bearbeitung in: '+name, editor+' hat einen Eintrag vom '+date+ ' bearbeitet!');

        this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: JSON.parse(JSON.stringify(this.hives[hiveIndex].hivecards))});
    }

    /**
     * updates a given hive
     *
     * @param hive
     */
    updateHive(hive: Hive) {
        let idsOfOthermMmbers: string[] =[];
        hive.pushIds.forEach((id) => {
            if(id !== this.localDb.pushId) {
                idsOfOthermMmbers.push(id);
            }
        });
        let name: string = hive.name;
        let editor: string = this.fireAuth.user.name;
        this.pushService.postNotificationToGroup(idsOfOthermMmbers, 'Bearbeitung in: '+name, editor+' hat das Volk '+ name + ' editiert!');

        this.firebaseFirestore.collection('hive').doc(hive.id).set(JSON.parse(JSON.stringify(hive)));
    }

    async redeemInviteCode(key: string) {
        this.firebaseFirestore.collection('hive').doc(key).update({'memberNames': FieldValue.arrayUnion(this.fireAuth.user.name)});
        this.firebaseFirestore.collection('hive').doc(key).update({'pushIds': FieldValue.arrayUnion(this.localDb.pushId)});
        return this.firebaseFirestore.collection('hive').doc(key).update({'members': FieldValue.arrayUnion(this.fireAuth.uid)});
    }


    /**
     *
     * @ignore
     */
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

}
/**
 *
 * @ignore
 */
function isHive(hiveId: string, hive: Hive) {
    return hive.id === hiveId;
}
/**
 *
 * @ignore
 */
function isHiveCard(hivecradId: string, hivecard: Hivecard) {
    return hivecard.id === hivecradId;
}
