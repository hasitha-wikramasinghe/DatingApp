import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users : any;

  constructor() { }

  ngOnInit(): void {}

  registerToggler(): void {
    this.registerMode = true;
  }

  cancelRegister(event: boolean) {
    this.registerMode = event;
  }

}
