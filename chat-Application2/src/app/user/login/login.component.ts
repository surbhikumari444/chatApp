import { Component, OnInit } from '@angular/core';
import {CookieService } from 'ngx-cookie-service';

import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../notification.service';
import { AppService } from '../../app.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;


  constructor(private notifyService : NotificationService, public appService: AppService,
    private _route: ActivatedRoute,private router: Router, private cookieService :CookieService) { }

  ngOnInit(): void {
  }
  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp
  public signinFunction: any = () => {

    if (!this.email) {
      this.notifyService.showWarning ("enter username!!", "ItSolutionStuff.com")

    } else if (!this.password) {

      this.notifyService.showWarning ("enter Password!!", "ItSolutionStuff.com")


    } else {

      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

        
          if (apiResponse.status === 200) {
            console.log(apiResponse)

            this.cookieService.set('authtoken', apiResponse.data.authToken);
            
            this.cookieService.set('receiverId', apiResponse.data.userDetails.userId);
            
            this.cookieService.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             this.notifyService.showSuccess('Signup successful', "ItSolutionStuff.com")


            setTimeout(() => {

              this.router.navigate(['/chat']);

            }, 2000);
            

          } 
          else {

            this.notifyService.showError("ItSolutionStuff.com",apiResponse.message)
            
          

          }

        }
        , (err) => {
          this.notifyService.showError("ItSolutionStuff.com",'some error occured')

        });

    } // end condition

  } // end signinFunction




}
