import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value){
          let arr = value.split(" ") ;
          arr.forEach( w => arr[arr.indexOf(w)] = w[0].toUpperCase() + w.substring(1,w.length))
          return arr.join(' ');
    }

  }

}
