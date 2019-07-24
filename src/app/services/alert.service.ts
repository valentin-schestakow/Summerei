import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Settings} from '../model/settings.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private logoutSubject = new Subject<any>();
  public logoutObservable = this.logoutSubject.asObservable();

  constructor() { }

  public setLogout(logout: boolean) {
    this.logoutSubject.next(logout);
  }
}
