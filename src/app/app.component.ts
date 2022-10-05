import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from './services/services';
import { Utility } from './utility/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'hidubai-ui';
  constructor(public router: Router, private service: Service, private utility: Utility){

  }
  ngOnInit(): void {
    this.service.getLabelsData().subscribe((response) => {
      this.utility.labels = response;
    });
    this.service.getMetadata().subscribe((response) => {
      console.log("application form metadata -> ", response);
      if(response && response['data']){
        this.utility.setMetadata(response['data']);
      }
    });
    this.router.navigate(['login']);
  }
  
}
