import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:44353/api/';
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any) {
    return this.http.post<User>(this.baseURL + 'account/login', model).pipe(
      map((response: User) => {
        console.log(response);
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model:any) {
    return this.http.post<User>(this.baseURL + 'account/register', model).pipe(
      map((user : User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null || undefined);
  }
}
