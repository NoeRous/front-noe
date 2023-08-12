import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogFormRoleComponent } from '../dialog-form-role/dialog-form-role.component';

@Component({
  selector: 'app-comp-role',
  templateUrl: './comp-role.component.html',
  styleUrls: ['./comp-role.component.scss']
})
export class CompRoleComponent {

  roles: Role[] = [];
  @Output() newItemEvent = new EventEmitter<Role>();
  rolSelec:Role | undefined;

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  btnEdit(role: Role) {

    const dialogRef = this.dialog.open(DialogFormRoleComponent, {
      data: { data: role, type: 'edit' },
      width: '550px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (result.dataResp) {
            this.roles.unshift(result.dataResp);
          }
        }

      }
    }
    );

  }

  btnDelete(Role: Role) {

  }

  btnMenus(role: Role) {
    this.rolSelec = role;
    this.newItemEvent.emit(role)
  }

  btnRegister() {

    const dialogRef = this.dialog.open(DialogFormRoleComponent, {
      data: { data: null, type: 'create' },
      width: '550px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {

          // if (this.questionResponses) {
          //  this.questionResponses.unshift(result.dataResp);

        }

      }
    }
    );



  }


}
