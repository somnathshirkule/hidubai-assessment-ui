import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Utility } from '../utility/utility';
import { UiModalsComponent } from '../ui-modals/ui-modals.component';
import { Service } from '../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('uimodals', { static: false }) uimodals: UiModalsComponent;
  constructor(public router: Router, public service: Service, public utility: Utility) { }
  user = new User();
  ngOnInit() {
  }
  emailErrorMsg;
  pwdErrorMsg;
  onSubmit(){
    this.validateFields();
    if(this.utility.flag == 1)
      return;
    this.service.login(this.user).subscribe((response) => {
      if(response['Status'] && response['Status'] == 'Success'){
        if(response['data'] && response['data']['userName']){
          sessionStorage.setItem('userName', response['data']['userName']);
        }
        this.router.navigate(['home']);
      }
      if(response['Status'] && response['Status'] == 'Failure'){
        this.uimodals.openErrorPopup(response['Status'], response['message']);
      }
    },(error) =>{
      if(error.status == '401'){
        this.uimodals.openErrorPopup('Failure', error.error.message);
      }else if(error.status == '412'){
        this.uimodals.openErrorPopup('Invalid request','Please fill all mandatory fields or validate the entered data.');
      }
      else if(error.status == '500'){
        this.uimodals.openErrorPopup('Server Error occured','Please contact administrator.');
      }else{
        this.uimodals.openErrorPopup('Something went wrong',error.error.message != undefined ? error.error.message : error.error);
      }
    })
  }
  routeToSignUp(){
    this.router.navigate(['signup']);
  }

  validateFields(){
    this.utility.flag = 0;
    this.emailErrorMsg = this.utility.validateField('login.email',this.user.email);
    this.pwdErrorMsg = this.utility.validateField('login.password',this.user.password);
  }
}
