import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { tap, map } from 'rxjs/operators';
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
  messagesLoded: boolean = false ;  // try to show loading spinner  --   dosent work!
  constructor(
    private activeRoute: ActivatedRoute,
    private friendSRV: FriendsDataService,
    private authSRV: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.messages = this.friendSRV.getFriendMessages().pipe(
      tap(() => this.messagesLoded = true)
      )
    
    
    this.activeRoute.queryParams.subscribe(
      () => {
    this.messages = this.friendSRV.getFriendMessages() ;
  })
}

ownerMessage(owner: string){
  return owner == this.authSRV.getUser().email
}

}
