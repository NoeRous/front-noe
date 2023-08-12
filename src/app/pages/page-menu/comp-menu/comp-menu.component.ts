import { Component, Input } from '@angular/core';
import { Menu } from '../menu';
import { Role } from '../../page-role/role';
import { DialogFormMenuComponent } from '../dialog-form-menu/dialog-form-menu.component';
import { MenuService } from '../menu.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RoleMenuService } from '../../page-role-menu/role-menu.service';

@Component({
  selector: 'app-comp-menu',
  templateUrl: './comp-menu.component.html',
  styleUrls: ['./comp-menu.component.scss']
})
export class CompMenuComponent {
  menus: Menu[] = [];
  rolSelect: Role | undefined;
roleMenuSelect:any;
  menuSelect: Menu | undefined;

  @Input() set role(role: Role) {
    this.rolSelect = role;

    this.getMenus(this.rolSelect.id);
  }

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private roleMenuService: RoleMenuService
  ) { }

  ngOnInit(): void {

  }




  btnRegister() {
    const dialogRef = this.dialog.open(DialogFormMenuComponent, {
      data: { data: { menu: null, role: this.rolSelect }, type: 'create' },
      width: '650px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (result.dataResp) {
            //this.menus.unshift(result.dataResp);
            if (this.rolSelect) {
              this.getMenus(this.rolSelect.id);
            }
            
          }
        }
      }
    }
    );
  }

  getMenus(roleId: number): void {
    this.roleMenuSelect = undefined;
    this.menuService.getMenus(roleId)
      .subscribe(menus => this.menus = menus);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("event ", event);
    // moveItemInArray(this.menus, event.previousIndex, event.currentIndex);
  }

  btnMenu(menu: Menu) {
    this.roleMenuSelect = {menu, role:this.rolSelect};
    this.menuSelect = menu;
  }

  btnDelete(menu: Menu) {

  }

  btnEdit(menu: Menu) {
    const dialogRef = this.dialog.open(DialogFormMenuComponent, {
      data: { data: { menu: menu, role: this.rolSelect }, type: 'edit' },
      width: '650px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (this.rolSelect) {
            this.getMenus(this.rolSelect.id);
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
        if (this.rolSelect) {
          this.messageService.openSnackBar("Se quito el menu");
          this.getMenus(this.rolSelect.id);
        }
      });
    } catch (error) {
      this.messageService.openSnackBarError("Error al quitar el menu");
    }
  }

  btnAsignarMenu(menu: Menu) {
    if (this.rolSelect) {
      var roleMenu = {
        role_id: this.rolSelect.id,
        menu_id: menu.id
      };
      this.roleMenuService
        .addRoleMenu(roleMenu)
        .subscribe(roleMenu => {
          if (this.rolSelect) {
            this.messageService.openSnackBar("Se asigno el  menu");
            this.getMenus(this.rolSelect.id);
          }
        });
    } else {
      this.messageService.openSnackBarError("Seleccione un rol")
    }
  }


}
