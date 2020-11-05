import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators' ;
import { AuthService } from './auth.service';
import { Friend } from '../models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FriendsDataService {
  // user: firebase.User = this.authSRV.getUser() ;
  constructor(
    private authSRV: AuthService,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute
     ) {  }

  getFriendsFromServer(){
      return this.db.collection(this.authSRV.getUser().email + '-friends').valueChanges(); 
}

  getFriend(){
    let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
    this.activeRoute.queryParams.subscribe( params => activeFriendEmail = params["friend"]) ;
    return this.db.collection(this.authSRV.getUser().email + "-friends").doc(activeFriendEmail).valueChanges() ;
  }

  addFriend(friend: Friend){

    let name = friend.name ;
    let email = friend.email ;
    let imageURL = '' ;
    firebase.storage().ref().child(`profileImage-${email}/`).getDownloadURL().then( url =>  {
      imageURL = url ;  // check if the friend have 
      this.db.collection(friend.email + "-details").doc("details").valueChanges().subscribe(
      details => {
        this.db.firestore.collection(this.authSRV.getUser().email + '-friends').doc(friend.email).set({name, email, imageURL}) ;
      })
    })
    .catch( error => {
      this.db.firestore.collection(this.authSRV.getUser().email + '-friends').doc(friend.email).set({name, email, imageURL}) ;
    })
    
  }
  getFriendMessages(){
    let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      return this.db.
        collection(this.authSRV.getUser().email + "-friends").
        doc(activeFriendEmail).
        collection("text_messages").
        valueChanges().
        pipe(map(
        data => {
          let newArr = [];
          data.forEach( item => newArr.push([item["message"], item["owner"]]))
          return newArr ;
        }))
    } 
    addText(text: string){
      const id = JSON.stringify(new Date().getTime()) ;
      let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      this.db.
        collection(this.authSRV.getUser().email + "-friends").
        doc(activeFriendEmail).
        collection("text_messages").doc(id).set({message: text, owner: this.authSRV.getUser().email}) ; // add the text to this user texts

      this.db.
        collection(activeFriendEmail + "-friends").
        doc(this.authSRV.getUser().email).
        collection("text_messages").doc(id).set({message: text, owner: this.authSRV.getUser().email}) ; // add the text to the friend's data messages


    }
  

}
