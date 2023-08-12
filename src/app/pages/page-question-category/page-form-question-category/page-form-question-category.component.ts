import { Component } from '@angular/core';
import { QuestionCategory } from '../question-category';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionCategoryService } from '../question-category.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-form-question-category',
  templateUrl: './page-form-question-category.component.html',
  styleUrls: ['./page-form-question-category.component.scss']
})
export class PageFormQuestionCategoryComponent {

  
  id: any | undefined;

  questionCategory: QuestionCategory[] | undefined

  positionTypeForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionCategoryService: QuestionCategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.questionCategoryService.getQuestionCategory(this.id)
          .subscribe(questionCategory => {
            this.positionTypeForm.patchValue(questionCategory);
          });
      }

    });

  }

  onSubmit() {
    var sendData = this.positionTypeForm.value ;
    if (this.id) {
      this.questionCategoryService
        .updateQuestionCategory(this.id,sendData)
        .subscribe(questionCategory => {
          this.router.navigate(['/admin/question-category']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.questionCategoryService
        .addQuestionCategory(sendData)
        .subscribe(questionCategory => {
          this.router.navigate(['/admin/question-category']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

}
