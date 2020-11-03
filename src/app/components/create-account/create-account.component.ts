import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup ;
  errorMessage: string ;
  imageURL: string ;
  image ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl(null, [Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.email,Validators.required]),
      password1: new FormControl(null, [Validators.minLength(8),Validators.maxLength(15), Validators.required]),
      password2: new FormControl(null, [Validators.minLength(8),Validators.maxLength(15), Validators.required]),
      alies: new FormControl(null)
    })
  }
  onSubmit(){
    let form = this.createAccountForm ;
    let image = form.controls.alies.value == null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB1SJI2ncD_F_122VV6wxuQadDLU3sLl8EYw&usqp=CAU': form.controls.alies.value ;
    if( (form.controls.password1.value == form.controls.password2.value) && form.valid){
      this.authSRV.signUp(
        form.controls.name.value,
        form.controls.email.value,
        form.controls.password1.value,
      )
      firebase.storage().ref().child(`profileImage-${form.controls.email.value}/`).put(this.image)
    }
    else this.errorMessage = 'your inputs are invalid. try again'  
  }


  onChange(e: ElementRef){
    this.image = e['files'][0] ;
    let fileReader = new FileReader() ;
    // fileReader.readAsDataURL(image) ;
    // fileReader.onload = e => {
    //   this.imageURL = e.target.result as string ;
    // }
    
  }

}
