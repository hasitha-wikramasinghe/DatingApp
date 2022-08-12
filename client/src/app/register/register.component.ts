import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterMode = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {
      this.accountService.register(this.model).subscribe(response => {
        console.log(response);
        this.cancel();
      }, error => {
        this._snackBar.open(error.error, 'OK', {
          duration: 3000,
          panelClass: ['blue-snackbar']
        })
        console.log(error);
      })
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }

}
