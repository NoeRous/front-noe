import { Component } from '@angular/core';
import { Role } from '../page-role/role';

@Component({
  selector: 'app-page-role-menu',
  templateUrl: './page-role-menu.component.html',
  styleUrls: ['./page-role-menu.component.scss']
})
export class PageRoleMenuComponent {

  role:Role | undefined;

  addItem(role:any){
    this.role = role;

  }
}
