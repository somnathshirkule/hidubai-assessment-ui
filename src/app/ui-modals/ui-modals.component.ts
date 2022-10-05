import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utility } from '../utility/utility';

@Component({
  selector: 'app-ui-modals',
  templateUrl: './ui-modals.component.html',
  styleUrls: ['./ui-modals.component.css']
})
export class UiModalsComponent implements OnInit {

  constructor(public utility: Utility) { }
  errorModal = "none";
  successModal = "none";
  registeredModal = 'none';
  errorTitle; errorMsg; successTitle; successMsg;
  ngOnInit() {
  }

  openErrorPopup(title, msg) {
    this.errorTitle = title;
    this.errorMsg = msg
    this.errorModal = "block";
  }
  closeErrorPopup() {
    this.errorModal = "none";
  }
  OpenSuccessPopup(title, msg){
    this.successTitle = title;
    this.successMsg = msg;
    this.successModal = "block";
  }
  closeSuccessPopup(){
    this.successModal = "none";
  }
  openRegisteredPopup(title, msg){
    this.successTitle = title;
    this.successMsg = msg;
    this.registeredModal = "block";
  }
  closeRegisteredPopup(){
    this.registeredModal = "none";
  }
}
