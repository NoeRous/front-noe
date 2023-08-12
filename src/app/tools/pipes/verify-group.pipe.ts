import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyGroup'
})
export class VerifyGroupPipe implements PipeTransform {

  transform(values: any[], group: string): boolean {
    var resp = false;
    try {
     var  item = values.find(x=>x.group_slug == group);
     resp = item?true:false;
    } catch (error) {
      
    }
    
     return resp;
  }

}
