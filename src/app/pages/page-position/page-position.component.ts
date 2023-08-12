import { Component } from '@angular/core';
import { Position } from './position';
import { PositionService } from './position.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-position',
  templateUrl: './page-position.component.html',
  styleUrls: ['./page-position.component.scss']
})
export class PagePositionComponent {



  positions: Position[] = [];


  constructor(
    private positionService: PositionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPositions()
  }

  getPositions(): void {
    this.positionService.getPositions()
      .subscribe(positions => (this.positions = positions));
  }

  btnEdit(position: Position) {
    this.router.navigate(['/admin/position/edit', position.id]);
  }

  btnDelete(position: Position) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: position, title: "Confirmar", message: `¿Esta seguro de eliminar ${position.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.positionService.deletePosition(result.dataResp.data.id)
          .subscribe(positions => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getPositions();
          });



      }
    });
  }

}
