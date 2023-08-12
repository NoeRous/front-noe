import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { MenuService } from 'src/app/pages/page-menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  rol:string = 'rol'
  menus:any[]=[];

  constructor(private messageService: MessageService,
    private menuService: MenuService,
    private router:Router) { }

  ngOnInit(): void {
    this.rol =  localStorage.getItem('rol')??'Error';
    this.getMenus();
  }


  getMenus(): void {
    //this.menus.

    this.menuService.getRolesMenus()
      .subscribe(menus => (this.menus = menus));
  }

}
