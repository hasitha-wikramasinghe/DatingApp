import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = environment.apiUrl;
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any) {
    return this.http.post<User>(this.baseURL + 'account/login', model).pipe(
      map((response: User) => {
        console.log(response);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model:any) {
    return this.http.post<User>(this.baseURL + 'account/register', model).pipe(
      map((user : User) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null || undefined);
  }
}
