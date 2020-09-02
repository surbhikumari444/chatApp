import { Component, OnInit ,ViewChild , ElementRef} from '@angular/core';
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

  @ViewChild('scrollMe', { read: ElementRef }) 

  public scrollMe: ElementRef;

  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;
  public scrollToChatTop:boolean= false;
  public messageText: any=''; 
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

  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookieService.delete('authtoken');

          this.cookieService.delete('receiverId');

          this.cookieService.delete('receiverName');

          this.socketService.exitSocket()

          this.notifyService.showError('Logout successful', "ItSolutionStuff.com")


          setTimeout(() => {

            this.router.navigate(['/']);
          }, 2000);
          

        } else {
          this.notifyService.showError(apiResponse.message,"yeh")

        } // end condition

      }, (err) => {
        this.notifyService.showError,('some error occured')


      });

  } // end logout


  public sendMessageUsingKeypress: any = (event: any) => {

    if (event.keyCode === 13) { // 13 is keycode of enter.

      this.sendMessage();
      console.log(this.messageText)

    }

  } // end sendMessageUsingKeypress
  public sendMessage: any = () => {

    if(this.messageText){

      let chatMsgObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: this.cookieService.get('receiverName'),
        receiverId: this.cookieService.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      } // end chatMsgObject
      console.log(chatMsgObject);
      this.socketService.SendChatMessage(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)
      

    }
    else{
      this.notifyService.showWarning('text message can not be empty','yeh')

    }

  } // end sendMessage

  public userSelectedToChat: any = (id, name) => {

    console.log("setting user as active") 

    // setting that user to chatting true   
    this.userList.map((user)=>{
        if(user.userId==id){
          user.chatting=true;
        }
        else{
          user.chatting = false;
        }
    })

    this.cookieService.set('receiverId', id);

    this.cookieService.set('receiverName', name);


    this.receiverName = name;

    this.receiverId = id;

    this.messageList = [];

    this.pageValue = 0;

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }


    this.socketService.markChatAsSeen(chatDetails);

    this.getPreviousChatWithAUser();

  } // end userBtnClick function


  public loadEarlierPageOfChat: any = () => {

    this.loadingPreviousChat = true;

    this.pageValue++;
    this.scrollToChatTop = true;

    this.getPreviousChatWithAUser() 

  } 


  public getPreviousChatWithAUser :any = ()=>{
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);
    
    this.socketService.getChat(this.userInfo.userId, this.receiverId, this.pageValue * 10)
    .subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status == 200) {

        this.messageList = apiResponse.data.concat(previousData);

      } else {

        this.messageList = previousData;
        this.notifyService.showWarning('No Messages available','yeh')

       

      }

      this.loadingPreviousChat = false;

    }, (err) => {

      this.notifyService.showError('some error occured','yeh')


    });

  }// end get previous chat with any user

  public showUserName =(name:string)=>{

    this.notifyService.showSuccess("You are chatting with "+name ,'yeh')

  }




}
