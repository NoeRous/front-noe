import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './dialog-data';
import { DialogDataResp } from './dialog-data-resp';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  btnConfirm(){
    this.dialogRef.close(new DialogDataResp(this.data, true));
  }

}
