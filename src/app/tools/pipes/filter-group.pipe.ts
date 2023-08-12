import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGroup'
})
export class FilterGroupPipe implements PipeTransform {

  transform(values: any[], group: string): any[] {
    var items = []
    try {
       items = values.filter(x=>x.group_slug == group);
    } catch (error) {
      
    }
    
     return items;
  }

}
