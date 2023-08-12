import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-dialog-user-password',
  templateUrl: './dialog-user-password.component.html',
  styleUrls: ['./dialog-user-password.component.scss']
})
export class DialogUserPasswordComponent {
  userId: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
  ) {

    if (data.data) {
      this.userId = data.data;
    }

  }
  hide = true;
  userForm = this.fb.group({
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.userId) {
      var userId = this.userId;
    }
  }

  onSubmit() {
    if (this.userId) {
      this.userService.updateUserPassword(this.userId, this.userForm.value)
        .subscribe(user => {
          if (user.id) {
            this.dialogRef.close({ user });
            this.messageService.openSnackBar("Contraseña actualizada");
          } else {
            this.messageService.openSnackBarError("Error al actualizar la contraseña");
          }
        });
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

}
