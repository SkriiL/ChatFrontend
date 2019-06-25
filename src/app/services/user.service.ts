import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public static currentId = localStorage.getItem('id') ? new BehaviorSubject(parseInt(localStorage.getItem('id'), 10)) :
    sessionStorage.getItem('id') ? new BehaviorSubject(parseInt(sessionStorage.getItem('id'), 10)) : new BehaviorSubject(-1);

  signIn(username: string, password: string): Observable<User | undefined> {
    const str = username + ';' + password;
    this.socket.sendRequest('sign-in', str);
    return new Observable<User | undefined>(observer => {
      const sub = this.socket.onEvent('signed-in').subscribe(res => {
        if (res) {
          return observer.next(res) + sub.unsubscribe();
        } else {
          return observer.next(undefined) + sub.unsubscribe();
        }
      });
    });
  }

  create(username: string, email: string, password: string) {
    const str = username + ';' + email + ';' + password;
    this.socket.sendRequest('createUser', str);
  }

  constructor(private socket: SocketService) {
  }
}
