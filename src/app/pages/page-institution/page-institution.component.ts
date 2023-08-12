import { Component } from '@angular/core';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-institution',
  templateUrl: './page-institution.component.html',
  styleUrls: ['./page-institution.component.scss']
})
export class PageInstitutionComponent {



  institutions: Institution[] = [];


  constructor(
    private institutionService: InstitutionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getInstitutions()
  }

  getInstitutions(): void {
    this.institutionService.getInstitutions()
      .subscribe(institutions => (this.institutions = institutions));
  }

  btnEdit(institution: Institution) {
    this.router.navigate(['/admin/institution/edit', institution.id]);
  }

  btnDelete(institution: Institution) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: institution, title: "Confirmar", message: `¿Esta seguro de eliminar ${institution.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.institutionService.deleteInstitution(result.dataResp.data.id)
          .subscribe(institutions => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getInstitutions();
          });



      }
    });
  }

}
