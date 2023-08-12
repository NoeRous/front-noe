import { Component } from '@angular/core';
import { QuestionResponse } from '../question-response';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { QuestionResponseService } from '../question-response.service';
import { Question } from '../../page-question/question';
import { QuestionService } from '../../page-question/question.service';

@Component({
  selector: 'app-page-form-question-response',
  templateUrl: './page-form-question-response.component.html',
  styleUrls: ['./page-form-question-response.component.scss']
})
export class PageFormQuestionResponseComponent {

   
  id: any | undefined;

  questionResponce: QuestionResponse[] | undefined
  questions: Question[] = [];

  positionTypeForm = this.fb.group({
    name: ['', Validators.required],
    is_valid: [false,Validators.required],
    percentage:  [0,Validators.required],
    question_id: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionResponceService: QuestionResponseService,
    private router: Router,
    private messageService: MessageService,
    private questionService: QuestionService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.questionResponceService.getQuestionResponce(this.id)
          .subscribe(questionResponce => {
            this.positionTypeForm.patchValue(questionResponce);
          });
      }

    });

    this.getQuestions()

  }

  onSubmit() {
    var sendData = this.positionTypeForm.value ;
    if (this.id) {
      this.questionResponceService
        .updateQuestionResponce(this.id,sendData)
        .subscribe(questionResponce => {
          this.router.navigate(['/admin/question-response']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.questionResponceService
        .addQuestionResponce(sendData)
        .subscribe(questionResponce => {
          this.router.navigate(['/admin/question-response']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questions => (this.questions = questions));
  }

}
