import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private _matSnack: MatSnackBar) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this._matSnack.open('You are not authorized!', 'Ok', {
          duration: 3000,
          panelClass: ['blue-snackbar']
        })
        return false;
      })
    )
  }
}
