import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../models/user.model';
import { Service } from '../services/services';
import { UiModalsComponent } from '../ui-modals/ui-modals.component';
import { Utility } from '../utility/utility';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fnameErrorMsg; lnameErrorMsg; phoneErrorMsg;dobErrorMsg; emailErrorMsg; pwdErrorMsg;
  @ViewChild('uimodals', { static: false }) uimodals: UiModalsComponent;
  constructor(public router: Router, public service: Service, public utility: Utility) { }
  user = new User();
  ngOnInit() {
    let formdata = this.utility.getFormData('login');
    console.log('login metadata --> ', formdata);
  }
  routeToLogin(){
    this.router.navigate(['login']);
  }
  onSubmit(){
    this.validateFields();
    if(this.utility.flag == 1)
      return;
    this.service.signup(this.user).subscribe((response) => {
      if(response['Status'] && response['Status'] == 'Success'){
        this.uimodals.openRegisteredPopup(response['Status'], response['message']);
        this.clearData();
      }
      if(response['Status'] && response['Status'] == 'Failure'){
        this.uimodals.openErrorPopup(response['Status'], response['message']);
      }
    }, (error) => {
      console.log(error);
      if(error.status == '412'){
        this.uimodals.openErrorPopup('Invalid request','Please fill all mandatory fields or validate the entered data.');
      }
      else if(error.status == '500'){
        this.uimodals.openErrorPopup('Server Error occured','Please contact administrator.');
      }else{
        this.uimodals.openErrorPopup('Something went wrong',error.error.message != undefined ? error.error.message : error.error);
      }
    });
  }

  validateFields(){
    this.utility.flag = 0;
    this.fnameErrorMsg = this.utility.validateField('signup.firstName',this.user.firstName);
    this.lnameErrorMsg = this.utility.validateField('signup.lastName',this.user.lastName);
    this.phoneErrorMsg = this.utility.validateField('signup.phoneNumber',this.user.phoneNumber);
    this.dobErrorMsg = this.utility.validateField('signup.dob',this.user.dob);
    this.emailErrorMsg = this.utility.validateField('signup.email',this.user.email);
    this.pwdErrorMsg = this.utility.validateField('signup.password',this.user.password)
  }

  clearData(){
    this.user.dob = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.user.phoneNumber = '';
  }
}
