import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName;
  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
  }

}
