import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private authSRV: AuthService
  ){}
  title = 'Slack-Project';
  obs: Observable<any> ;
  ngOnInit(): void {  
    
  }

}
