import { Component, Inject } from '@angular/core';
import { QuestionResponse } from '../question-response';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { QuestionResponseService } from '../question-response.service';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { DialogDataResp } from 'src/app/share/dialog-confirm/dialog-data-resp';
import { Question } from '../../page-question/question';

@Component({
  selector: 'app-dialog-form-question-response',
  templateUrl: './dialog-form-question-response.component.html',
  styleUrls: ['./dialog-form-question-response.component.scss']
})
export class DialogFormQuestionResponseComponent {


  questionSelect: Question | undefined;
  isEdit: boolean = false;
  questionResponseEdit: QuestionResponse | undefined
  questionResponses: QuestionResponse[] = [];

  positionTypeForm = this.fb.group({
    question: ['', Validators.required],
    name: ['', Validators.required],
    is_valid: [false, Validators.required],
    percentage: [0, Validators.required],
    question_id: ['', Validators.required]
  });

  respData: any | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogFormQuestionResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private questionResponseService: QuestionResponseService,
  ) {

    if (data.data) {
      this.questionSelect = data.data.question;
      if (this.questionSelect) {




        var questionId = this.questionSelect.id;
        this.positionTypeForm.controls['question_id'].setValue(questionId.toString());
        this.positionTypeForm.controls['question'].setValue(this.questionSelect.name);
        this.positionTypeForm.controls['question'].disable();
      }


      switch (data.type) {
        case 'create':
          this.isEdit = false;
          break;

        case 'edit':
          this.isEdit = true;
          this.questionResponseEdit = data.data.questionResponse;
          this.positionTypeForm.patchValue(data.data.questionResponse);
          if (this.questionResponseEdit) {
            // var questionCategoryId = this.questionEdit.question_category.id;
            //  this.questionForm.controls['question_category_id'].setValue(questionCategoryId.toString());
          }
          break;

        default:
          break;
      }




    }

  }

  compareItemsCategory(i1: any, i2: any) {
    return i1 && i2 && i1.id === i2.id;
  }

  ngOnInit(): void {
    // this.getQuestionCategories();
  }

  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  onSubmitResponse() {
    var sendData = this.positionTypeForm.value;
    if (this.isEdit) {

      if (this.questionResponseEdit) {
        this.questionResponseService
          .updateQuestionResponce(this.questionResponseEdit.id, sendData)
          .subscribe(question => {
            this.dialogRef.close(new DialogDataResp(question, true));
            this.messageService.openSnackBar("Registro Editado");
          });
      }

    } else {
      this.questionResponseService
        .addQuestionResponce(sendData)
        .subscribe(question => {
          this.dialogRef.close(new DialogDataResp(question, true));
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }

  }

  get isValid(): FormControl {
    return this.positionTypeForm.get('is_valid') as FormControl;
  }


}
