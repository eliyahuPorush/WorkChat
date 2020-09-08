import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendsDataService } from 'src/app/services/friends-data.service';

interface Friend{
  name:string ;
  email: string ;
  text: string[] ;
  imgURL?:string ;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {
  friend: Friend;
  type = "chat" ;
  constructor(
    private activeRoute: ActivatedRoute,
    private friendsSRV: FriendsDataService
  ) { }

  ngOnInit(): void {
    this.friendsSRV.getFriend().subscribe(
      friend => {
        this.friend = friend as Friend;
        
      }) 
    this.activeRoute.queryParams.subscribe(
      () => {
        this.friendsSRV.getFriend().subscribe(
          friend => {
            this.friend = friend as Friend;
          }) }) ;
  }

}
