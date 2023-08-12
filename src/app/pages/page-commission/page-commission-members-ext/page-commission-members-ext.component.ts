import { Component, Input, Pipe } from '@angular/core';
import { Commission, CommissionExternal, CommissionInternal } from '../commission';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommissionService } from '../commission.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-commission-members-ext',
  templateUrl: './page-commission-members-ext.component.html',
  styleUrls: ['./page-commission-members-ext.component.scss']
})
export class PageCommissionMembersExtComponent {

  //@Input() commissionId: any | undefined;

  @Input() commission: Commission  | undefined;

  commissionId: any|undefined;

  commissionExternals: any[]= [];

  loading = true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private commissionService: CommissionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if(this.commission){
      this.commissionExternals = this.commission.commissionExternal;
      this.commissionId = this.commission.id
    }
    this.loading = false;
  }


  btnEdit(commissionExternal: any) {
    this.router.navigate(['/admin/commission/members/representative/edit', commissionExternal.id]);
  }


  btnDelete(commissionExternal: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: commissionExternal, title: "Confirmar", message: `¿Esta seguro de eliminar?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.commissionService.deleteCommissionExternal(result.dataResp.data.id)
          .subscribe(commissionExternal => {
            this.messageService.openSnackBar("Se eliminó el Registro");
            this.commissionService.getCommission(this.commissionId)
            .subscribe(commission => (
              this.commissionExternals = commission.commissionExternal
              )); 
            this.router.navigate(['/admin/commission/members', this.commissionId]);
          });
      }
    });
  }

}
