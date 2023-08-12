import { Component, Input } from '@angular/core';
import { QuestionResponse } from '../question-response';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { QuestionResponseService } from '../question-response.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { DialogFormQuestionResponseComponent } from '../dialog-form-question-response/dialog-form-question-response.component';
import { Question } from '../../page-question/question';

@Component({
  selector: 'app-comp-form-question-response',
  templateUrl: './comp-form-question-response.component.html',
  styleUrls: ['./comp-form-question-response.component.scss']
})
export class CompFormQuestionResponseComponent {

  //@Input() questionResponses: QuestionResponse[] | undefined;
  @Input() question: Question | undefined;
  questionResponses: QuestionResponse[]=[]


  constructor(
    private questionResponseService: QuestionResponseService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

ngOnInit(): void {
  if (this.question) {
    if (this.question.question_response) {
       this.questionResponses = this.question.question_response;
    }
    
  }
  
}


  btnEditResponse(questionResponse: QuestionResponse) {
    const dialogRefEdit = this.dialog.open(DialogFormQuestionResponseComponent, {
      data: { data: {questionResponse,question:this.question }, type:'edit' },
      width:'550px',
      disableClose:true
    });
    dialogRefEdit.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          if (this.questionResponses) {
            var indexQuestion =  this.questionResponses.findIndex(x=>x.id ==result.dataResp.id );
            this.questionResponses[indexQuestion] = result.dataResp;
          }
          
        }
      }
    });
  }

  btnCreateResponse() {
    const dialogRef = this.dialog.open(DialogFormQuestionResponseComponent, {
      data: { data: {question:this.question}, type:'create' },
      width:'550px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {

          if (this.questionResponses) {
            this.questionResponses.unshift(result.dataResp);
          // this.questionResponses.push(result.dataResp);
          }
          
        }
      }
    });
  }

  btnDeleteResponse(questionResponse: QuestionResponse) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: questionResponse, title: "Confirmar", message: `¿Esta seguro de eliminar ${questionResponse.name}?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.questionResponseService.deleteQuestionResponce(result.dataResp.data.id)
          .subscribe(questionResponseResp => {
                if (questionResponseResp.statusCode==202) {
                const index=  this.questionResponses.findIndex(x=>x.id == questionResponse.id);
                this.questionResponses.splice(index, 1)
                  this.messageService.openSnackBar("Se Elimino el Registro ");
                } else {
                  this.messageService.openSnackBarError("Error al eliminar el registro ");
                }
          });
      }
    });
  }


}
