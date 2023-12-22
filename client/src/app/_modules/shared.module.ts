import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    MatSnackBarModule,
    BsDropdownModule
  ]
})
export class SharedModule { }
