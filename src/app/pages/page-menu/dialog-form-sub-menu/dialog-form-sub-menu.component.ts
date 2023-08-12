import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { DialogDataResp } from 'src/app/share/dialog-confirm/dialog-data-resp';
import { Menu } from '../../page-menu/menu';
import { MenuService } from '../../page-menu/menu.service';
import { Role } from '../../page-role/role';

@Component({
  selector: 'app-dialog-form-sub-menu',
  templateUrl: './dialog-form-sub-menu.component.html',
  styleUrls: ['./dialog-form-sub-menu.component.scss']
})
export class DialogFormSubMenuComponent {

  menu: Menu | undefined;
  subMenu: Menu | undefined;
  role: Role | undefined;
  subMenuForm = this.fb.group({
    rol: ['', Validators.required],
    menu: ['', Validators.required],
    name: ['', Validators.required],
    url: [''],
    icon: ['folder', Validators.required],
    // label: ['', Validators.required],
    menu_id: ['', Validators.required],
   
  });

  constructor(
    public dialogRef: MatDialogRef<DialogFormSubMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private menuService: MenuService,
  ) {

    if (data.data) {
      this.role = data.data.role;
      this.menu = data.data.menu;
      this.subMenu = data.data.subMenu;
      if (data.data.subMenu) {
        this.subMenu = data.data.subMenu;
        this.subMenuForm.patchValue(data.data.subMenu);
      } else {

      }

      this.subMenuForm.controls['rol'].setValue(this.role ? this.role.name : '');
      this.subMenuForm.controls['rol'].disable();

      this.subMenuForm.controls['menu'].setValue(this.menu ? this.menu.name : '');
      this.subMenuForm.controls['menu'].disable();
      this.subMenuForm.controls['menu_id'].setValue(this.menu ? (this.menu.id).toString() : '')
    }

  }

  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  onSubmitResponse() {
    var sendData = this.subMenuForm.value;
    if (this.subMenu) {

      this.menuService
        .updateMenu(this.subMenu.id, sendData)
        .subscribe(menu => {
          this.dialogRef.close(new DialogDataResp(menu, true));
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.menuService
        .addMenu(sendData)
        .subscribe(menu => {
          this.dialogRef.close(new DialogDataResp(menu, true));
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }

  }

  get icon(): FormControl {
    return this.subMenuForm.get('icon') as FormControl;
  }

}
