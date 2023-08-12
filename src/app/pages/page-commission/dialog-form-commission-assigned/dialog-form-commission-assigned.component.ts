import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { CommissionService } from '../commission.service';
import { CommissionAssigned } from '../commission';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-dialog-form-commission-assigned',
  templateUrl: './dialog-form-commission-assigned.component.html',
  styleUrls: ['./dialog-form-commission-assigned.component.scss']
})
export class DialogFormCommissionAssignedComponent {

  commissionAsigned: CommissionAssigned | undefined;
  commissionAsignedId:any|undefined;


  commissionAssignedForm = this.fb.group({
    act_init_date: [''],
    act_end_date: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogFormCommissionAssignedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private commissionService: CommissionService,
    private messageService: MessageService,
  ) {

    if (data.data) {
      this.commissionAsigned = data.data;
    }

  }

  ngOnInit(): void {
    if (this.commissionAsigned) {
      this.commissionAsignedId = this.commissionAsigned.id;
      if (this.commissionAsignedId) {
        this.commissionService.getCommissionAssigned(this.commissionAsignedId)
          .subscribe(commissionAssigned => {
            this.commissionAssignedForm.patchValue(commissionAssigned);
          });
      }
    }
  }

  onSubmit() {
    if (this.commissionAsignedId) {
      this.commissionService.updateCommissionAssigned(this.commissionAsignedId, this.commissionAssignedForm.value)
        .subscribe(commissionAsigned => {
          if (commissionAsigned.id) {
            this.dialogRef.close({ commissionAsigned });
            this.messageService.openSnackBar("Actualizado");
          } else {
            this.messageService.openSnackBarError("Error al actualizar");
          }
        });
    }
  }





  

}
