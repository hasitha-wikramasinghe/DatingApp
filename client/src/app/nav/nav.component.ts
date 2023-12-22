import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService : AccountService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setUserSourceNull();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('members')
    }, error => {
      console.log(error)
      // this._snackBar.open(error.error, error.statusText, {
      //   duration: 3000,
      //   panelClass: ['blue-snackbar']
      // })
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  setUserSourceNull() {
    if(localStorage.getItem('user') == null) {
      this.accountService.currentUserSource.next(null || undefined);
    }
  }

}
