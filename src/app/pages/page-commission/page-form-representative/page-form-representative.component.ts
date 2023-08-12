import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommissionService } from '../commission.service';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-form-representative',
  templateUrl: './page-form-representative.component.html',
  styleUrls: ['./page-form-representative.component.scss']
})
export class PageFormRepresentativeComponent {
  commissionId: any | undefined;
  
  id: any | undefined;

  edit: boolean = false;

  commissionExternalForm = this.fb.group({
    identity_card: ['', Validators.required],
    identity_card_complement: [''],
    last_name: [''],
    mothers_last_name: [''],
    husband_last_name: [''],
    second_name: [''],
    firts_name: ['', Validators.required],
    personal_number: ['', Validators.required],
    name_role: ['', Validators.required],
    name_institution: ['', Validators.required],
    commission_id: ['', Validators.required],
  });

  commissionExternalEditForm = this.fb.group({
    representative: this.fb.group({
      identity_card: ['', Validators.required],
      identity_card_complement: [''],
      last_name: [''],
      mothers_last_name: [''],
      husband_last_name: [''],
      second_name: [''],
      firts_name: ['', Validators.required],
      personal_number: ['', Validators.required],
    }),
    name_role: ['', Validators.required],
    name_institution: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commissionService: CommissionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {

    this.commissionExternalForm.controls['commission_id'].setValue(this.commissionId ? this.commissionId : '');
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.commissionId = params.get('commissionId');
      this.id = params.get('id');
    });
    if(this.commissionId){
      this.commissionExternalForm.controls['commission_id'].setValue(this.commissionId ? this.commissionId : '');
    }

    if (this.id) {
      this.commissionService.getCommissionExternal(this.id)
        .subscribe(commissionExternal => {
          this.commissionId = commissionExternal.commission.id,
          this.commissionExternalEditForm.patchValue(commissionExternal);
        });
      this.edit = true;
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Esta seguro de realizar el registro?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.commissionService
          .addCommissionExternal(this.commissionExternalForm.value)
          .subscribe(resp => {
            if (resp.id) {
              this.commissionExternalForm.reset();
              this.router.navigate(['/admin/commission/members', this.commissionId]);
            } else {
              this.router.navigate(['/admin/commission/members/representative', this.commissionId, 'create']);
              this.router.navigate(['/admin/commission/members/representative/edit', this.id]);
            }
          });
      }
    });
  }

  onSubmitEdit() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Esta seguro de Editar el registro?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.commissionService
          .updateCommissionExternal(this.id,this.commissionExternalEditForm.value)
          .subscribe(resp => {
            if (resp.id) {
              this.commissionExternalEditForm.reset();
              this.router.navigate(['/admin/commission/members', this.commissionId]);
            } else {
              this.router.navigate(['/admin/commission/members/representative/edit', this.id]);
            }
          });
      }
    });
  }

}
