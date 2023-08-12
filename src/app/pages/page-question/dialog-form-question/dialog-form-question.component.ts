import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { QuestionCategory } from '../../page-question-category/question-category';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import { QuestionService } from '../question.service';
import { QuestionCategoryService } from '../../page-question-category/question-category.service';
import { DialogDataResp } from 'src/app/share/dialog-confirm/dialog-data-resp';
import { Question } from '../question';

@Component({
  selector: 'app-dialog-form-question',
  templateUrl: './dialog-form-question.component.html',
  styleUrls: ['./dialog-form-question.component.scss']
})
export class DialogFormQuestionComponent {

  questionEdit: Question | undefined
  questionCategories: QuestionCategory[] = [];
  questionForm = this.fb.group({
    name: ['', Validators.required],
    question_category_id: [0, Validators.required],
    enabled: [true]

  });

  constructor(
    public dialogRef: MatDialogRef<DialogFormQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private questionService: QuestionService,
    private questionCategoryService: QuestionCategoryService,

  ) {

    if (data.data) {
      this.questionEdit = data.data;
      this.questionForm.patchValue(data.data);
      if (this.questionEdit) {
        var questionCategoryId = this.questionEdit.question_category.id;
        this.questionForm.controls['question_category_id'].setValue(questionCategoryId);
      
      }

    }

  }



  ngOnInit(): void {
    this.getQuestionCategories();
  }

  compareItemsCategoryD(i1: any, i2: any) {
    return i1 && i2 && i1.id === i2.id;
  }

  btnClose(): void {
    this.dialogRef.close(new DialogDataResp(this.data, false));
  }

  onSubmit() {
    var sendData = this.questionForm.value;
    if (this.questionEdit) {


      this.questionService
      .updateQuestion(this.questionEdit.id,sendData)
      .subscribe(question => {
        this.dialogRef.close(new DialogDataResp(question, true));
        this.messageService.openSnackBar("Registro Editado");
      });


    } else {
      this.questionService
        .addQuestion(sendData)
        .subscribe(question => {
          this.dialogRef.close(new DialogDataResp(question, true));
           this.messageService.openSnackBar("Nuevo Registro");
        });
    }

  }

  getQuestionCategories(): void {
    this.questionCategoryService.getQuestionCategories()
      .subscribe(questionCategories => (this.questionCategories = questionCategories));
  }

}
