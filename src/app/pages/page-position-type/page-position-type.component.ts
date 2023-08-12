import { Component } from '@angular/core';
import { PositionType } from './position-type';
import { PositionTypeService } from './position-type.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-position-type',
  templateUrl: './page-position-type.component.html',
  styleUrls: ['./page-position-type.component.scss']
})
export class PagePositionTypeComponent {


  positionTypes: PositionType[] = [];


  constructor(
    private positionTypeService: PositionTypeService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPositionTypes()
  }

  getPositionTypes(): void {
    this.positionTypeService.getPositionTypes()
      .subscribe(positionTypes => (this.positionTypes = positionTypes));
  }

  btnEdit(positionType: PositionType) {
    this.router.navigate(['/admin/position-type/edit', positionType.id]);
  }

  btnDelete(positionType: PositionType) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: positionType, title: "Confirmar", message: `¿Esta seguro de eliminar ${positionType.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.positionTypeService.deletePositionType(result.dataResp.data.id)
          .subscribe(positionType => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getPositionTypes();
          });



      }
    });
  }

}
