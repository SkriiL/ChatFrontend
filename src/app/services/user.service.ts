import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public static currentId = localStorage.getItem('id') ? new BehaviorSubject(parseInt(localStorage.getItem('id'), 10)) :
    sessionStorage.getItem('id') ? new BehaviorSubject(parseInt(sessionStorage.getItem('id'), 10)) : new BehaviorSubject(-1);

  create(username: string, email: string, password: string): Observable<number[]> {
    const str = username + ';' + email + ';' + password;
    this.socket.sendRequest('create-user', str);
    return new Observable<number[]>(observer => {
      const sub = this.socket.onEvent('created-user').subscribe((res: number[]) => {
        if (res) {
          observer.next(res);
          sub.unsubscribe();
        }
      });
    });
  }

  getAll(): Observable<User[]> {
    this.socket.sendRequest('get-all-users', '');
    return new Observable<User[]>(observer => {
      const sub = this.socket.onEvent('all-users').subscribe(res => {
        if (res) {
          observer.next(res);
          sub.unsubscribe();
        }
      });
    });
  }

  getSingleById(id: number): Observable<User> {
    this.socket.sendRequest('get-user-by-id', id.toString());
    return new Observable<User>(observer => {
      const sub = this.socket.onEvent('single-user').subscribe(u => {
        observer.next(u);
        console.log(u);
        sub.unsubscribe();
      });
    });
  }

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

  verifyEmail(id: number) {
    this.socket.sendRequest('verify-email', id.toString());
  }

  constructor(private socket: SocketService) {
  }
}
