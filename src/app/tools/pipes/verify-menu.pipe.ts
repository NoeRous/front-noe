import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyMenu'
})
export class VerifyMenuPipe implements PipeTransform {

  transform(value: any[]): boolean {
    if (value) {
      return !(value.length==0);
    }else{
     return false;
    }
   
  }

}
