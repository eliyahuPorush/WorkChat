import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Friend } from 'src/app/models/friend.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  addFriendForm: FormGroup ;
  user: firebase.User ;
  constructor( 
    private friendDataSRV: FriendsDataService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authSRV: AuthService) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
  this.addFriendForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required,Validators.email])
  })    
  }
  onSubmit(){
 
  if(this.addFriendForm.valid){
    let newFriend = new Friend(this.addFriendForm.controls.name.value, this.addFriendForm.controls.email.value) ;
    this.friendDataSRV.addFriend(newFriend) ;
    this.addFriendForm.reset() ;
    this.router.navigate([this.user.email, "dashboard","chat"], { queryParams:{'friend': newFriend.email}})

  }
    
  }
}
