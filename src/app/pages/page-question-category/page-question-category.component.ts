import { Component } from '@angular/core';
import { QuestionCategory } from './question-category';
import { QuestionCategoryService } from './question-category.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-question-category',
  templateUrl: './page-question-category.component.html',
  styleUrls: ['./page-question-category.component.scss']
})
export class PageQuestionCategoryComponent {

  questionCategories: QuestionCategory[] = [];


  constructor(
    private questionCategoryService: QuestionCategoryService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getQuestionCategories()
  }

  getQuestionCategories(): void {
    this.questionCategoryService.getQuestionCategories()
      .subscribe(questionCategories => (this.questionCategories = questionCategories));
  }

  btnEdit(questionCategory: QuestionCategory) {
    this.router.navigate(['/admin/question-category/edit', questionCategory.id]);
  }

  btnDelete(questionCategory: QuestionCategory) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: questionCategory, title: "Confirmar", message: `¿Esta seguro de eliminar ${questionCategory.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.questionCategoryService.deleteQuestionCategory(result.dataResp.data.id)
          .subscribe(questionCategory => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getQuestionCategories();
          });



      }
    });
  }

  btnAnnouncementInstitutionPosition(announcement: QuestionCategory) {
  //  this.router.navigate(['/admin/question', announcement.id]);

    this.router.navigate(['/admin/question']);
  }
}
