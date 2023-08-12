import { Component } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { DialogFormQuestionComponent } from './dialog-form-question/dialog-form-question.component';
import { Paginate } from 'src/app/tools/paginate/paginate';
import { PageEvent } from '@angular/material/paginator';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { QuestionCategoryService } from '../page-question-category/question-category.service';
import { QuestionCategory } from '../page-question-category/question-category';

@Component({
  selector: 'app-page-question',
  templateUrl: './page-question.component.html',
  styleUrls: ['./page-question.component.scss']
})
export class PageQuestionComponent {

  displayedColumns: string[] = ['position', 'name', 'category', 'response', 'option'];

  questions: Question[] = [];
  paginateQuestion: Paginate | undefined;
  paginate: HandlePageEvent = {pageIndex:1, pageSize:10};
  questionCategories: QuestionCategory[] = [];
  categorySelect:any=null;
  
  constructor(
    private questionService: QuestionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private questionCategoryService: QuestionCategoryService,
  ) { }

  ngOnInit(): void {
    if (this.paginate) {
      this.getQuestions(this.categorySelect);
      this.getQuestionCategories();
    }
  }

  getQuestions(categorieId:any): void {
    this.questionService.getQuestions(categorieId)
      .subscribe(questions => {
        if (questions) {
        
          this.questions = questions
        }

      });
  }

  getQuestionCategories(): void {
    this.questionCategoryService.getQuestionCategories()
      .subscribe(questionCategories => (this.questionCategories = questionCategories));
  }


  getPaginateQuestions(pageEvent: HandlePageEvent): void {
    this.questionService.getPaginateQuestions(pageEvent)
      .subscribe(paginate => {
        if (paginate) {
          this.paginateQuestion = paginate;
          this.questions = this.paginateQuestion.items
        }

      });
  }

  btnEdit(question: Question) {
    const dialogRefEdit = this.dialog.open(DialogFormQuestionComponent, {
      data: { data: question },
    });
    dialogRefEdit.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          var indexQuestion = this.questions.findIndex(x => x.id == result.dataResp.id);
          this.questions[indexQuestion] = result.dataResp;
        }
      }
    });
  }

  btnCreate() {
    const dialogRef = this.dialog.open(DialogFormQuestionComponent, {
      data: { data: null },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.dataResp) {
          this.questions.unshift(result.dataResp);
        }
      }
    });
  }

  compareItemsCategoryD(i1: any, i2: any) {
    return i1 && i2 && i1.id === i2.id;
  }

  btnDelete(question: Question) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: question, title: "Confirmar", message: `¿Esta seguro de eliminar ${question.name}?` },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.questionService.deleteQuestion(result.dataResp.data.id)
          .subscribe(questions => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            if (this.paginate) {
              this.getQuestions(this.categorySelect);
            }
            
          });
      }
    });
  }

  btnAnnouncementInstitutionPosition(announcement: Question) {
    this.router.navigate(['/admin/question-category', announcement.id]);
  }

  handlePageEvent(e: PageEvent) {
    var index = e.pageIndex +1
    this.paginate.pageIndex= index;
    this.paginate.pageSize= e.pageSize;
    this.getQuestions(this.categorySelect);
  }

  changeCategory(){
    this.getQuestions(this.categorySelect);
  }

}
