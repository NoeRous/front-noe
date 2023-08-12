import { Component } from '@angular/core';
import { PostulationTestService } from './postulation-test.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { PostulationService } from '../page-postulation/postulation.service';
import { Postulation } from '../page-postulation/Postulation';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-postulation-test',
  templateUrl: './page-postulation-test.component.html',
  styleUrls: ['./page-postulation-test.component.scss']
})
export class PagePostulationTestComponent {

  postulationId: any | undefined;
  postulation: any | undefined;
  constructor(
    private postulationTestService: PostulationTestService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private postulationService:PostulationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postulationId = params.get('postulationId');
      const id_ = this.postulationId;
      this.getPostulation(this.postulationId);
    })
  }

  getPostulation(postulationId:number): void {
    this.postulationService.getPostulation(postulationId)
      .subscribe(postulation => {
        this.postulation = postulation;


      });
  }

  btnPostulationTestCreate(postulation: Postulation) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: postulation, title: "Confirmar", message: `¿Esta seguro de realizar el examen?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.router.navigate(['/admin/postulation-test/create/', postulation.id]);
      }
    });
  }

}
