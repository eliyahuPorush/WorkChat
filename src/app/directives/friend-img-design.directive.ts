import { Directive, ElementRef, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFriendImgDesign]'
})
export class FriendImgDesignDirective {
  constructor(el: ElementRef) {

          el.nativeElement.style = `
          border-radius: 50% ;
          max-height: 40% ;
          max-width : 40% ;
          width: 40% ;
          height: 40% ;

            ` ;
    }


   }


