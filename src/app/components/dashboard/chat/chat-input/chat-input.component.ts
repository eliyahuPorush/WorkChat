import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FriendsDataService } from 'src/app/services/friends-data.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
@ViewChild('input') textContnent: ElementRef ;
friendEmail: string ;
  constructor(
    private friendSRV: FriendsDataService
  ) { }
 

  ngOnInit(): void {
  }
  onSend(){
    let text = this.textContnent.nativeElement.value;
    this.friendSRV.addText(text) ;
    this.textContnent.nativeElement.value = '' ;
    
  }
}
