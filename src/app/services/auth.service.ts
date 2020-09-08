import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subject, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:firebase.User ;
  isLogedIn = new BehaviorSubject<boolean>(false) ;
  errorFound = new Subject<string>() ;

  constructor(
    private router: Router,
    public auth: AngularFireAuth
    ) {}

    loginWithGoogle() {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(v => {
         this.loginSuccess(v) ;
      })
      .then(() => this.router.navigate([this.user.email , 'dashboard']) )
      .catch(er => console.log(er)
      )
    }
    loginWithFacebook(){
      this.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(v => {
         this.loginSuccess(v) ;
      })
      .then(() => this.router.navigate([this.user.email , 'dashboard']) )
    }
    logout() {
        this.auth.signOut().then(res =>{
        this.user = undefined ;
        this.router.navigate(['login']) ;
        this.isLogedIn.next(false) ;
      });
    }
  signUp(name:string, email: string, password: string, alies: string){
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
          this.updateProfile(name, alies, email) ;
      })
      .then(() => this.logIn(email, password))
      .then(() => this.isLogedIn.next(true))
      .catch(error => {
        console.log(error);
      this.errorFound.next(this.handleErrorMessage(error.message)) ;

      })
  }
  logIn(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      this.loginSuccess(res) ;
    })
    .then(() => this.router.navigate([this.user.email , 'dashboard']) )
    .then(() => this.isLogedIn.next(true))
    .catch(error => {
      let errorMassege = error.message ;
      this.errorFound.next(this.handleErrorMessage(errorMassege)) ;
    });
  }
  private loginSuccess(res){
    this.user = firebase.auth().currentUser ;
    return
  }
  private handleErrorMessage(message: string){
    switch(message){
      case 'EMAIL_NOT_FOUND': 
      case 'INVALID_PASSWORD':
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      case "The password is invalid or the user does not have a password.":
        return 'one of details is incorrect...try again' ;
      default: return 'Unkonwn Error'
    }

  }
  updateProfile(name: string, imgURL: string, email: string) {  
    firebase.auth().currentUser.updateEmail(email) ;
    firebase.auth().currentUser.updateProfile({
      displayName: name,
      photoURL: imgURL
    }) ;
}
  getUser(){
    return this.user ;
  }
}
