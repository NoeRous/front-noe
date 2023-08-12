import { Component } from '@angular/core';
import { InstitutionType } from './institution-type';
import { InstitutionTypeService } from './institution-type.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-institution-type',
  templateUrl: './page-institution-type.component.html',
  styleUrls: ['./page-institution-type.component.scss']
})
export class PageInstitutionTypeComponent {


  institutionTypes: InstitutionType[] = [];


  constructor(
    private institutionTypeService: InstitutionTypeService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getInstitutionTypes()
  }

  getInstitutionTypes(): void {
    this.institutionTypeService.getInstitutionTypes()
      .subscribe(institutionTypes => (this.institutionTypes = institutionTypes));
  }

  btnEdit(institutionType: InstitutionType) {
    this.router.navigate(['/admin/institutionType/edit', institutionType.id]);
  }




  btnDelete(institutionType: InstitutionType) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: institutionType, title: "Confirmar", message: `¿Esta seguro de eliminar ${institutionType.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.institutionTypeService.deleteInstitutionType(result.dataResp.data.id)
          .subscribe(institutionTypes => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getInstitutionTypes();
          });



      }
    });
  }

}
