import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: firebase.User ;
  userName: string ;
  listLoded: boolean = false ;
  isLogout: boolean ;
  imageFile ;
  // photo: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB1SJI2ncD_F_122VV6wxuQadDLU3sLl8EYw&usqp=CAU' ;
  constructor(
    private authSRV: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isLogout = false ;
    this.user = firebase.auth().currentUser ;
    firebase.storage().ref().child(`profileImage-${this.user.email}/`).getDownloadURL().then(url => {
      this.imageFile = url ;
    })
    this.userName = this.user.displayName ;
    // this.photo = this.user.photoURL ;
  }
  addFriend(){
    this.router.navigate(['add_friend'], {relativeTo: this.activeRoute})
  }
  logout() {
    this.isLogout = true ;
    setTimeout(() => {
      this.authSRV.logout() ;
    },2500)
  }
  profile(){
    this.router.navigate([ this.user.email, 'dashboard','profile'])
  }

}
