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
  selector: 'app-dialog-form-menu',
  templateUrl: './dialog-form-menu.component.html',
  styleUrls: ['./dialog-form-menu.component.scss']
})
export class DialogFormMenuComponent {

  menu: Menu | undefined;
  role: Role | undefined;
  menuForm = this.fb.group({
    rol: ['', Validators.required],
    name: ['', Validators.required],
    url: [''],
    icon: ['folder', Validators.required],
    // label: ['', Validators.required],
    group: ['', Validators.required],
   
  });

  groups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogFormMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private menuService: MenuService,
  ) {

    if (data.data) {
      this.role = data.data.role;
      if (data.data.menu) {
        this.menu = data.data.menu;
        this.menuForm.patchValue(data.data.menu);
      } else {

      }

      this.menuForm.controls['rol'].setValue(this.role ? this.role.name : '');
      this.menuForm.controls['rol'].disable();
    }

  }


  ngOnInit(): void {
    this.groupData();
  }

  groupData(): void {
    this.groups = [
      'Menú prinipal',
      'Administrar Postulaciones',
      'Administrar',
      'Parametricas',
      'Biblioteca de preguntas',
      'Roles y Permisos'
    ];


  

  }




  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  onSubmitResponse() {
    var sendData = this.menuForm.value;
    if (this.menu) {

      this.menuService
        .updateMenu(this.menu.id, sendData)
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
    return this.menuForm.get('icon') as FormControl;
  }

}
