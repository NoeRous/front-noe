import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { User } from '../user';
import { RoleService } from '../../page-role/role.service';
import { Role } from '../../page-role/role';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-user-roles',
  templateUrl: './dialog-user-roles.component.html',
  styleUrls: ['./dialog-user-roles.component.scss']
})
export class DialogUserRolesComponent {

  user: User | undefined;
  roles: Role[] = [];

  rolUserForm = this.fb.group({
    user_id: [0, Validators.required],
    role_id: [0, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private userService:UserService
  ) {

    if (data.data) {
      this.user = data.data;
    }

  }

  ngOnInit(): void {
    this.getRoles();
    if (this.user) {
      var roleId = this.user.userRole.role.id;
      var userId = this.user.id;
      this.rolUserForm.controls['user_id'].setValue(userId);
      this.rolUserForm.controls['role_id'].setValue(roleId);
    }
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  onSubmit() {
  
    if (this.user) {
      var userRoleId = this.user.userRole.id;
      this.userService.updateUserRole(userRoleId, this.rolUserForm.value)
        .subscribe(roles => {
          this.dialogRef.close({roles});
          this.messageService.openSnackBar("Registro Editado");
        });
    }

  }


}
