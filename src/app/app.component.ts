import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  constructor(
    private authSRV: AuthService
  ){}
  ngAfterViewInit(): void {
  }
  title = 'Slack-Project';
  obs: Observable<any> ;
  ngOnInit(): void {  

  }

}
