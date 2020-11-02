import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReversePipe } from 'ngx-pipes';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  providers: [ReversePipe]
})
export class ChatMessagesComponent implements OnInit {
  messages: Observable<string[]> ;
  messagesLoded: boolean = false ;  // for display spinner until the messages loded
  haveMessages: boolean = false ;
  constructor(
    private activeRoute: ActivatedRoute,
    private friendSRV: FriendsDataService,
    private authSRV: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.messages = this.friendSRV.getFriendMessages() ;
    this.messages.subscribe(m => {
      this.messagesLoded = true // deactivate the spinner
      this.haveMessages = m.length > 0 ;
    }) 
    
    this.activeRoute.queryParams.subscribe(
      () => {
    this.messagesLoded = false ; // activate the spinner 
    this.messages = this.friendSRV.getFriendMessages() ;
    this.messages.subscribe( m => {
      this.messagesLoded = true ; // deactivate the spinner
      this.haveMessages = m.length > 0 ; 
    } )
    this.haveMessages = true ; // deactivate the spinner
  })
}

ownerMessage(owner: string){
  return owner == this.authSRV.getUser().email
}

thereIsAmeassages(m){
  return m.length > 0 
}

}
