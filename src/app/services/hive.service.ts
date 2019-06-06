import { Injectable } from '@angular/core';
import {Hive} from '../model/hive.model';
import {HiveCard} from '../model/hive-card.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  public hives: Hive[] = [];
  nextHiveId: number;

  public hiveCards: HiveCard[] = [];
  nextHiveCardId: number;
  private changeEmitter: boolean = false;

  constructor() {
    let hivesJSON: string = localStorage.getItem('hives');
    let hiveCardsJSON: string = localStorage.getItem('hiveCards');

    if (hivesJSON) {
      this.hives = JSON.parse(hivesJSON);
      this.nextHiveId = parseInt(localStorage.getItem('nextHiveId'));
    } else {
      this.hives = [];
      this.nextHiveId = 1;
      this.persistHive(new Hive(this.nextHiveId,this.hiveCards,'Test_Datum','Garten'));
      this.persistHive(new Hive(this.nextHiveId,this.hiveCards,'Test_Datum','Verein Volk 2'));
      this.persistHive(new Hive(this.nextHiveId,this.hiveCards,'Test_Datum','Verein Volk 3'));
    }

    if (hiveCardsJSON) {
      this.hiveCards = JSON.parse(hiveCardsJSON);
      this.nextHiveCardId = parseInt(localStorage.getItem('nextHiveCardId'));
    } else {
      this.hiveCards = [];
      this.nextHiveCardId = 1;
      this.persistHiveCard(new HiveCard(0,"test"));
    }

  }

  listenToChange(){
    let observable = new Observable<boolean>(observer => {
      observer.next(this.changeEmitter);
    });
    return observable;
  }
  emitChange(change: boolean){
    this.changeEmitter = change;
  }


  persistHive(hive: Hive): void {
    hive.id = this.nextHiveId++;
    this.hives.push(hive);
    this.saveHive();
  }

  private saveHive(): void {
    localStorage.setItem('hives', JSON.stringify(this.hives));
    localStorage.setItem('nextHiveId', this.nextHiveId.toString());
  }


  findAllHives(): Hive[] {
    let recordsJSON: string = localStorage.getItem('hives');
    this.hives = JSON.parse(recordsJSON);
    this.nextHiveId = parseInt(localStorage.getItem('nextHiveId'));
    return this.hives;
  }


  persistHiveCard(hiveCard: HiveCard): void {
    this.hiveCards.push(hiveCard);
    this.saveHiveCards();
  }

  private saveHiveCards(): void {
    localStorage.setItem('hiveCards', JSON.stringify(this.hiveCards));
    localStorage.setItem('nextHiveCardId', this.nextHiveId.toString());
  }


  findAllHiveCards(): HiveCard[] {
    let recordsJSON: string = localStorage.getItem('hiveCards');
    this.hiveCards = JSON.parse(recordsJSON);
    return this.hiveCards;
  }

  findHiveById(id: number): Hive {
    return this.hives.find(h => h.id == id);
  }

  findHiveCardById(id: number): HiveCard {
    return this.hiveCards.find(h => h.id == id);
  }

  updateHiveCard(hiveCard: HiveCard){
    for (let i in this.hiveCards) {
      if (this.hiveCards[i].id == hiveCard.id) {
        this.hiveCards[i] = hiveCard;
      }
    }
    this.hiveCards;
    this.saveHiveCards();
  }

  updateHive(hive: Hive){
    for (let i in this.hives) {
      if (this.hives[i].id == hive.id) {
        this.hives[i] = hive;
      }
    }
    this.hives;
    this.saveHive();
  }


  deleteHive(id: number) {
    for (let i in this.hives) {
      if (this.hives[i].id == id) {
        this.hives.splice(+i);
      }
    }
    this.saveHive();
  }


  private getHivecardsById(volkId: number): HiveCard[] {
    let ret: HiveCard[] = [];
    for (let card of this.hiveCards) {
      if (card.volkId == volkId) {
        ret.push(card);
      }
    }
    return ret;
  }

}
