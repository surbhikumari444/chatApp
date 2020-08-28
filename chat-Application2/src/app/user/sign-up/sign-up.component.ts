import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../notification.service';
import { AppService } from '../../app.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;


  constructor( private notifyService : NotificationService, public appService: AppService,
    private _route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn
  public signupFunction: any = () => {

    if (!this.firstName) {
      this.notifyService.showWarning ("enter First name!!", "ItSolutionStuff.com")
    
    }
    else if (!this.lastName) {
      this.notifyService.showWarning('enter last name', "ItSolutionStuff.com")

    } else if (!this.mobile) {
      this.notifyService.showWarning('enter mobile', "ItSolutionStuff.com")


    } else if (!this.email) {
      this.notifyService.showWarning('enter email', "ItSolutionStuff.com")


    } else if (!this.password) {
      this.notifyService.showWarning('enter Password', "ItSolutionStuff.com")
     

    } else if (!this.apiKey) {
      this.notifyService.showWarning('Enter your API key', "ItSolutionStuff.com")


    } else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

      this.notifyService.showWarning('Signup successful', "ItSolutionStuff.com")


            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

      this.notifyService.showWarning(apiResponse.message, "ItSolutionStuff.com")


          }

        }, (err) => {

      this.notifyService.showWarning('some error occured', "ItSolutionStuff.com")


        });

    } // end condition

  } // end signupFunction


}
