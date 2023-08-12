import { Component } from '@angular/core';
import { Question } from '../question';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import { QuestionCategoryService } from '../../page-question-category/question-category.service';
import { QuestionService } from '../question.service';
import { QuestionCategory } from '../../page-question-category/question-category';

@Component({
  selector: 'app-page-form-question',
  templateUrl: './page-form-question.component.html',
  styleUrls: ['./page-form-question.component.scss']
})
export class PageFormQuestionComponent {


  id: any | undefined;

  question: Question[] | undefined;

  questionCategories: QuestionCategory[] = [];

  questionForm = this.fb.group({
    name:['',Validators.required],
    question_category_id: ['', Validators.required],
    enabled: [true]

  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private questionService: QuestionService,
    private questionCategoryService: QuestionCategoryService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.questionService.getQuestion(this.id)
          .subscribe(question => {
            this.questionForm.patchValue(question);
          });
      }

    });
    this.getQuestionCategories()

  }

  onSubmit() {
    var sendData = this.questionForm.value ;
    if (this.id) {
      this.questionService
        .updateQuestion(this.id,sendData)
        .subscribe(question => {
          this.router.navigate(['/admin/question']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.questionService
        .addQuestion(sendData)
        .subscribe(question => {
          this.router.navigate(['/admin/question']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

  getQuestionCategories(): void {
    this.questionCategoryService.getQuestionCategories()
      .subscribe(questionCategories => (this.questionCategories = questionCategories));
  }



}
