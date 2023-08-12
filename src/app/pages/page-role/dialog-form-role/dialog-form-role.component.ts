import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { DialogDataResp } from 'src/app/share/dialog-confirm/dialog-data-resp';
import { Menu } from '../../page-menu/menu';
import { MenuService } from '../../page-menu/menu.service';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-dialog-form-role',
  templateUrl: './dialog-form-role.component.html',
  styleUrls: ['./dialog-form-role.component.scss']
})
export class DialogFormRoleComponent {


  role: Role | undefined;
  roleForm = this.fb.group({
    name: ['', Validators.required],
  });


  constructor(
    public dialogRef: MatDialogRef<DialogFormRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
  ) {

    if (data.data) {
      this.role = data.data;
      this.roleForm.patchValue(data.data);
    }

  }


  ngOnInit(): void {
  
  }

  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  onSubmitResponse() {
    var sendData = this.roleForm.value;
    if (this.role) {

      this.roleService
        .updateRole(this.role.id, sendData)
        .subscribe(rol => {
          this.dialogRef.close(new DialogDataResp(rol, true));
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.roleService
        .addRole(sendData)
        .subscribe(rol => {
          this.dialogRef.close(new DialogDataResp(rol, true));
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }

  }



}
