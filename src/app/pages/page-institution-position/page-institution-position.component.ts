import { Component } from '@angular/core';

import { InstitutionPositionService } from './institution-position.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { InstitutionPosition } from './institution-position';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-institution-position',
  templateUrl: './page-institution-position.component.html',
  styleUrls: ['./page-institution-position.component.scss']
})
export class PageInstitutionPositionComponent {


  institutionPositions: InstitutionPosition[] = [];


  constructor(
    private institutionService: InstitutionPositionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getInstitutionPositions()
  }

  getInstitutionPositions(): void {
    this.institutionService.getInstitutionPositions()
      .subscribe(institutionPositions => (this.institutionPositions = institutionPositions));
  }

  btnEdit(institution: InstitutionPosition) {
    this.router.navigate(['/admin/institution-position/edit', institution.id]);
  }

  btnDelete(institutionPosition: InstitutionPosition) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: institutionPosition, title: "Confirmar", message: `¿Esta seguro de eliminar ${institutionPosition.institution.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.institutionService.deleteInstitution(result.dataResp.data.id)
          .subscribe(institutionPositions => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getInstitutionPositions();
          });



      }
    });
  }

}
