import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  errorMessage :string ;
  loginPressed: boolean = false ;
  createNewAccountPressed: boolean = false ;

  constructor(
    private authSRV: AuthService,
    private router: Router    
    ) { }
    
    loginWithGoogle() {
      this.authSRV.loginWithGoogle() ;
    }
  ngOnInit(): void {
    // console.log("storage: ", firebase.storage().refFromURL('gs://workchat-6060.appspot.com/profileImage'))
    
    this.loginForm = new FormGroup({
      email: new FormControl('tamar@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('tamar6040', [Validators.required, Validators.minLength(6)])
    })
    this.authSRV.errorFound.subscribe(error => 
      this.errorMessage = error
      )

  }
  onSubmit(){
    let params = [this.loginForm.controls.email.value, this.loginForm.controls.password.value] // email & password
    // if(this.logInText == 'Sign Up') this.authSRV.signUp(params[0], params[1]) ; // sign up method
    // else if(this.logInText == 'Log In') this.authSRV.logIn(params[0], params[1]) ; // log in method

    this.loginPressed = true ;
    setTimeout(() => {
      this.authSRV.logIn(params[0], params[1]) ; 
      // this.loginPressed = false ;
    }, 2000)
  }
  onCreateAccount(){
    this.createNewAccountPressed = true ;
    setTimeout(() => {
      this.router.navigate(['/createAccount'])
    },1000)
  }

}
