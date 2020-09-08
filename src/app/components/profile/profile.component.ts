import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup ;
  user: firebase.User ;
  constructor(private authSRV: AuthService) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
    this.profileForm = new FormGroup({
          name: new FormControl(this.user.displayName),
          email: new FormControl(this.user.email, Validators.email),
          alies: new FormControl(this.user.photoURL)
    })
  }
  onSubmit(){
    let contols = this.profileForm.controls ;
    this.authSRV.updateProfile(contols.name.value, contols.alies.value, contols.email.value) ;
  }
}
