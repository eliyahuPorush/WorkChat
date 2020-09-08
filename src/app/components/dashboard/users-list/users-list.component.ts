import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 friends:Observable<any> ;
 @Output() isLoded: EventEmitter<boolean> = new EventEmitter<boolean>() ;
 

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private friendsData: FriendsDataService
    ) {}

  ngOnInit(): void {
    
     this.friends = this.friendsData.getFriendsFromServer() ;
     this.friends.subscribe(() => this.isLoded.emit(true))
  }
 
  friendSelected(friendEmail: string){
    this.router.navigate(["chat"], {relativeTo: this.activeRoute, queryParams:{'friend': friendEmail}})
  }

}
