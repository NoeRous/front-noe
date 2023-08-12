import { Component } from '@angular/core';
import { Commission, CommissionAssigned } from '../commission';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommissionService } from '../commission.service';
import { MessageService } from 'src/app/message.service';
import { DialogFormCommissionAssignedComponent } from '../dialog-form-commission-assigned/dialog-form-commission-assigned.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-commission-assigned',
  templateUrl: './page-commission-assigned.component.html',
  styleUrls: ['./page-commission-assigned.component.scss']
})
export class PageCommissionAssignedComponent {

  commissionId: any | undefined;
  commission: Commission | undefined;
  commissionAssigneds: CommissionAssigned[] = [];

  loading = true

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commissionService: CommissionService,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.commissionId = params.get('commissionId');
    });

    this.getCommissionAssigneds();
  }

  getCommissionAssigneds(): void {
    this.commissionService.getCommissionAssigneds(this.commissionId)
      .subscribe(commission => (
        this.commission = commission,
        this.commissionAssigneds = commission.commissionAssigned,
        this.loading = false
        )); 
  }

  btnDialogEdit(commissionAssigned:CommissionAssigned){
    const dialogRef = this.dialog.open(DialogFormCommissionAssignedComponent, {data:{data:commissionAssigned}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCommissionAssigneds();
    });

  }
}
