import { Component, OnInit } from '@angular/core';
import {CookieService } from 'ngx-cookie-service';

import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../notification.service';
import { AppService } from '../../app.service'
import { SocketService } from '../../socket.service'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {

  public scrollToChatTop:boolean= false;
  public messageText: any; 
  public messageList: any = [];
  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean;  
  public receiverId: any;
  public receiverName: any;

  constructor(private notifyService : NotificationService, public appService: AppService,
    private _route: ActivatedRoute,private router: Router, private cookieService :CookieService 
    ,private socketService: SocketService) { }

  ngOnInit(): void {

    this.receiverId = this.cookieService.get("receiverId");

    this.receiverName =  this.cookieService.get('receiverName');
    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    console.log(this.receiverId,this.receiverName)


    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    this.getMessageFromAUser()






  }
  public checkStatus: any = () => {

    if (this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' || this.cookieService.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus
  public verifyUserConfirmation: any = () => {

    this.socketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.socketService.setUser(this.authToken);

      });
    }
    public getOnlineUserList :any =()=>{

      this.socketService.onlineUserList()
        .subscribe((userList) => {
  
          this.userList = [];
  
          for (let x in userList) {
  
            let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
  
            this.userList.push(temp);          
  
          }
          
          console.log(this.userList);
  
        });} // end online-user-list

        public pushToChatWindow : any =(data)=>{

          this.messageText="";
          this.messageList.push(data);
          this.scrollToChatTop = false;
      
      
        }// end push to chat window
      
    
    public getMessageFromAUser :any =()=>{

      this.socketService.chatByUserId(this.userInfo.userId)
      .subscribe((data)=>{
       

        (this.receiverId==data.senderId)?this.messageList.push(data):'';

        this.notifyService.showSuccess(`${data.senderName} says : ${data.message}`,"yeh")

        this.scrollToChatTop=false;

      });//end subscribe

  }// end get message from a user 


}
