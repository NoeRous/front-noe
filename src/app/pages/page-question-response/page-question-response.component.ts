import { Component } from '@angular/core';
import { QuestionResponse } from './question-response';
import { QuestionResponseService } from './question-response.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-question-response',
  templateUrl: './page-question-response.component.html',
  styleUrls: ['./page-question-response.component.scss']
})
export class PageQuestionResponseComponent {

  questionCategories: QuestionResponse[] = [];


  constructor(
    private questionResponceService: QuestionResponseService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getQuestionResponces()
  }

  getQuestionResponces(): void {
    this.questionResponceService.getQuestionResponces()
      .subscribe(questionCategories => (this.questionCategories = questionCategories));
  }

  btnEdit(questionCategory: QuestionResponse) {
    this.router.navigate(['/admin/question-response/edit', questionCategory.id]);
  }

  btnDelete(questionCategory: QuestionResponse) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: questionCategory, title: "Confirmar", message: `¿Esta seguro de eliminar ${questionCategory.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.questionResponceService.deleteQuestionResponce(result.dataResp.data.id)
          .subscribe(questionCategory => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getQuestionResponces();
          });



      }
    });
  }

  // btnAnnouncementInstitutionPosition(announcement: QuestionResponse) {
  // //  this.router.navigate(['/admin/question', announcement.id]);

  //   this.router.navigate(['/admin/question']);
  // }

}
