import { Component, Inject } from '@angular/core';
import { QuestionResponse } from '../question-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { MessageService } from 'src/app/message.service';
import { Question } from '../../page-question/question';

@Component({
  selector: 'app-dialog-list-response',
  templateUrl: './dialog-list-response.component.html',
  styleUrls: ['./dialog-list-response.component.scss']
})
export class DialogListResponseComponent {




  questionResponses: QuestionResponse[] = [];
  question:Question | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogListResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  
    private messageService: MessageService,
   
  ) {

    if (data.data) {
 
        this.questionResponses = data.data.responses
        this.question = data.data.question;

    }

  }


  ngOnInit(): void {
    // this.getQuestionCategories();
  }

  btnClose(): void {
    this.dialogRef.close();
  }




}
