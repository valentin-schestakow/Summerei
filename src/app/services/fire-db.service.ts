import {Injectable} from '@angular/core';
import {Hive} from '../model/hive.model';
import {Hivecard} from '../model/hive-card.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {FireAuthService} from './fire-auth.service';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  constructor(private firebaseFirestore: AngularFirestore,
              private fireAuth: FireAuthService) {
    let query = this.firebaseFirestore.collection('hive', ref => ref.where('members' ,'array-contains', this.fireAuth.uid+""));
    query.valueChanges().subscribe(data => {
      let tempHives: Hive[] = [];
      data.forEach((hive) =>{
        tempHives.push(plainToClass(Hive, hive));
      });
      this.hives = tempHives;
    });
  }

  public hives: Hive[] = [];
  public hivecards: Hivecard[] = [];
  private changeEmitter: boolean = false;

  getHivesOfCurrentUser() {
    let query = this.firebaseFirestore.collection('hive', ref => ref.where('members' ,'array-contains', this.fireAuth.uid+""));
    return  query.valueChanges()
  }

  createHive(hive: Hive) {
    hive.id = this.firebaseFirestore.createId();
    hive.adminId = this.fireAuth.uid;
    hive.state = "good";

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let stringToday = dd + '.' + mm + '.' + yyyy;0
    hive.creationDate = stringToday;

    let members: string[] = [];
    members.push(this.fireAuth.uid);
    hive.members = members;

    let hivecards: Hivecard[] = [];
    hive.hivecards = hivecards;

    this.firebaseFirestore.collection("hive").doc(hive.id).set(JSON.parse(JSON.stringify(hive)))
        .then((ret) => {
          console.log(ret);
        }).catch((error) => {
          console.log(error);
    })
  }

  addHivecardToHive(hiveId: string, hiveCard: Hivecard) {
    let year: string = hiveCard.creationDate.substr(0,4);
    let month: string = hiveCard.creationDate.substr(5,2);
    let day: string = hiveCard.creationDate.substr(8,2);

    let date: string = day+'.'+ month +'.'+ year;

    hiveCard.creationDate = date;

    let tempCards: Hivecard[] = this.hives.find(hive => isHive(hiveId,hive)).hivecards;
    tempCards.push(hiveCard);

    this.firebaseFirestore.collection('hive').doc(hiveId).update({hivecards: JSON.parse(JSON.stringify(tempCards))});
  }

  deletHivecard(hiveId: string, hivecardId: string) {
    let tempCards: Hivecard[] = this.hives.find(hive => isHive(hiveId,hive)).hivecards;
    for (let i = 0; i < tempCards.length; i++) {
      if(tempCards[i].id == hivecardId){
        tempCards.splice(i,1);
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

  // listenToChange(){
  //   let observable = new Observable<boolean>(observer => {
  //     observer.next(this.changeEmitter);
  //   });
  //   return observable;
  // }
  //
  // emitChange(change: boolean){
  //   this.changeEmitter = change;
  // }

  observeHives() : Observable<Hive[]> {
    return new Observable<Hive[]>(observer => {
      observer.next(this.hives);
    });
  }

  findAllHiveCards(): Hivecard[] {
    this.hivecards = [];
    this.hives.forEach(hive => {
      hive.hivecards.forEach(card => {
        this.hivecards.push(card);
      })
    });
    return this.hivecards;
  }


  //@TODO verschiedene Methods zum bearbeiten der Hives an sich
}

function isHive(hiveId: string, hive: Hive) {
  return hive.id === hiveId;
}
function isHiveCard(hivecradId: string, hivecard: Hivecard) {
  return hivecard.id === hivecradId;
}