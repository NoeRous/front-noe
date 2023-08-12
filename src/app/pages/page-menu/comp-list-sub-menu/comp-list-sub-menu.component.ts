import { Component, Input, Output,EventEmitter, SimpleChanges } from '@angular/core';
import { Menu } from '../menu';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MenuService } from '../menu.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { RoleMenuService } from '../../page-role-menu/role-menu.service';
import { DialogFormSubMenuComponent } from '../dialog-form-sub-menu/dialog-form-sub-menu.component';
import { Role } from '../../page-role/role';

@Component({
  selector: 'app-comp-list-sub-menu',
  templateUrl: './comp-list-sub-menu.component.html',
  styleUrls: ['./comp-list-sub-menu.component.scss']
})
export class CompListSubMenuComponent {

  subMenus:Menu[] | undefined;
  menuSelect:Menu | undefined;
role:Role | undefined

  @Input()  roleMenuInput: any | undefined

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private roleMenuService: RoleMenuService
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    var data= changes['roleMenuInput'].currentValue;
      this.menuSelect = data.menu;
      this.role = data.role;
      if (this.menuSelect && this.role) {
        this.getSubMenus(this.menuSelect.id, this.role.id) 
      }  
  }

  getSubMenus(menuId: number, roleId:number): void {
    this.menuService.getSubMenus(menuId,roleId)
      .subscribe(subMenus => this.subMenus = subMenus);
  }

  btnRegister(){
    const dialogRef = this.dialog.open(DialogFormSubMenuComponent, {
      data: { data: { subMenu:null,menu: this.menuSelect, role: this.role }, type: 'create' },
      width: '650px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (result.dataResp) {
            if (this.menuSelect && this.role) {
              this.getSubMenus(this.menuSelect.id, this.role.id)
            }
          }
        }
      }
    }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("event ", event);

    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  btnEdit(submenu:Menu){
    const dialogRef = this.dialog.open(DialogFormSubMenuComponent, {
      data: { data: { subMenu:submenu,menu: this.menuSelect, role: this.role }, type: 'edit' },
      width: '650px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (result.dataResp) {
            if (this.menuSelect && this.role) {
              this.getSubMenus(this.menuSelect.id, this.role.id)
            }
          }
        }
      }
    }
    );
  }

  btnQuitarMenu(menu: Menu) {
    try {
      var roleMenuId = menu.role_menus[0].id;
      this.roleMenuService
      .deleteRoleMenu(roleMenuId)
      .subscribe(roleMenu => {
        if (this.menuSelect && this.role) {
          this.messageService.openSnackBar("Se quito el Sub menu");
          this.getSubMenus(this.menuSelect.id, this.role.id)
        }
      });
    } catch (error) {
      this.messageService.openSnackBarError("Error al quitar el menu");
    }
  }

  btnAsignarMenu(menu: Menu) {
    if (this.role) {
      var roleMenu = {
        role_id: this.role.id,
        menu_id: menu.id
      };
      this.roleMenuService
        .addRoleMenu(roleMenu)
        .subscribe(roleMenu => {
          if (this.menuSelect && this.role) {
            this.getSubMenus(this.menuSelect.id, this.role.id)
          }
        });
    } else {
      this.messageService.openSnackBarError("Seleccione un rol")
    }
  }

}
