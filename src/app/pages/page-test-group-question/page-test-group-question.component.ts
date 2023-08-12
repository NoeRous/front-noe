import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { TestService } from '../page-test/test.service';
import { TestGroupService } from '../page-test-group/test-group.service';
import { Test } from '../page-test/test';
import { TestGroup } from '../page-test-group/test-group';
import { Question } from '../page-question/question';
import { TestGroupQuestion } from './test-group-question';
import { QuestionService } from '../page-question/question.service';
import { DialogListResponseComponent } from '../page-question-response/dialog-list-response/dialog-list-response.component';
import { QuestionResponse } from '../page-question-response/question-response';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { TestGroupQuestionService } from './test-group-question.service';

@Component({
  selector: 'app-page-test-group-question',
  templateUrl: './page-test-group-question.component.html',
  styleUrls: ['./page-test-group-question.component.scss']
})
export class PageTestGroupQuestionComponent {


  test: Test | undefined;
  testGroup: TestGroup | undefined;
  testId: any | undefined;
  groupId: any | undefined;

  questions: Question[] = [];

  testGroupQuestions: TestGroupQuestion[] = [];
  removeTestGroupQuestions: Question[] = [];
  addTestGroupQuestions: Question[] = [];
  countRemoveQuestion:any|undefined;
  countAddQuestion:any|undefined;
  constructor(
    private testGroupService: TestGroupService,
    private testGroupQuestionService: TestGroupQuestionService,
    private questionService: QuestionService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('testId');
      this.groupId = params.get('groupId');
      this.getTest(this.testId);
      this.getGroup(this.groupId);
      this.getQuestionAll();
    })
    this.countRemoveQuestion = 0;
    this.countAddQuestion = 0;
  }


  getTest(testId: number): void {
    this.testService.getTest(testId)
      .subscribe(test => (this.test = test));
  }

  getQuestionAll(): void {
    this.questionService.getQuestions()
      .subscribe(questions => (this.questions = questions));
  }

  getGroup(groupId: number): void {
    this.testGroupService.getTestGroup(groupId)
      .subscribe(testGroup => {
        this.testGroup = testGroup;
        if (this.testGroup) {
          this.testGroupQuestions = this.testGroup?.test_group_question;
        }

      });
  }

  btnListResponses(question: Question) {

    this.dialogResponses(question,question.question_response)

  }
  dialogResponses(question:Question,responses: QuestionResponse[]) {
    const dialogRefEdit = this.dialog.open(DialogListResponseComponent, {
      data: { data: {question,responses} },
      width: '700px',
      disableClose: true
    });
  }

  addQuestion(question: Question): void {
    if (this.addTestGroupQuestions.find(q => q.id === question.id)) {
      const index = this.addTestGroupQuestions.findIndex(q => q.id === question.id);
      if (index !== -1) {
        this.addTestGroupQuestions.splice(index, 1);
      } 
    }else{
      this.addTestGroupQuestions.push(question);
    }
    this.countAddQuestion = this.addTestGroupQuestions.length
  }

  removeQuestion(question: Question): void {
    if (this.removeTestGroupQuestions.find(q => q.id === question.id)) {
      const index = this.removeTestGroupQuestions.findIndex(q => q.id === question.id);
      if (index !== -1) {
        this.removeTestGroupQuestions.splice(index, 1);
      } 
    }else{
      this.removeTestGroupQuestions.push(question);
    }
    this.countRemoveQuestion = this.removeTestGroupQuestions.length
  }

  btnDelete() {
    console.log(this.groupId, this.removeTestGroupQuestions);
    this.testGroupQuestionService.deleteTestGroupQuestion(this.groupId, this.removeTestGroupQuestions)
      .subscribe(() => {
        console.log('Preguntas eliminadas exitosamente');
        this.getGroup(this.groupId);
        this.removeTestGroupQuestions= [];
        this.countRemoveQuestion = 0
      }, (error) => {
        this.removeTestGroupQuestions= [];
        this.countRemoveQuestion = 0
        console.error('Error al eliminar preguntas:', error);
      });
  }

  btnAdd() {
    console.log(this.groupId, this.addTestGroupQuestions);
    this.testGroupQuestionService.addTestGroupQuestion(this.groupId, this.addTestGroupQuestions)
      .subscribe(() => {
        console.log('Preguntas adicionadas exitosamente');
        this.getGroup(this.groupId);
        this.getQuestionAll();
        this.addTestGroupQuestions = [];
        this.countAddQuestion = 0;
      }, (error) => {
        this.addTestGroupQuestions = [];
        this.countAddQuestion = 0;
        console.error('Error al eliminar preguntas:', error);
      });
  }
}
