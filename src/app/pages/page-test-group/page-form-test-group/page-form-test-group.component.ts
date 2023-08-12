import { Component } from '@angular/core';
import { TestGroup } from '../test-group';
import { Test } from '../../page-test/test';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { TestGroupService } from '../test-group.service';
import { TestService } from '../../page-test/test.service';

@Component({
  selector: 'app-page-form-test-group',
  templateUrl: './page-form-test-group.component.html',
  styleUrls: ['./page-form-test-group.component.scss']
})
export class PageFormTestGroupComponent {

  id: any | undefined;

  testGroup: TestGroup[] | undefined;

  tests: Test[] = [];

  testId: any | undefined;
  test: Test | undefined;

  testGroupForm = this.fb.group({
    test_id: ['', Validators.required],
    name:['',Validators.required],
    description:['',Validators.required],
    num_questions:['',Validators.required],
    points_per_question:['',Validators.required],
    sequence:['',Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private testService: TestService,
    private testGroupService: TestGroupService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');
      this.testId = params.get('testId');
      console.log(" this.id ",  this.id);
      console.log("this.testId noooooemi", this.testId);
      this.getTest(this.testId);
      
      const id_ = this.testId;
      if (this.id) {
        this.testGroupService.getTestGroup(this.id)
          .subscribe(test => {
            this.testGroupForm.patchValue(test);
          });
      }
  
      this.testGroupForm.controls['test_id'].setValue(this.testId.toString());
      this.testGroupForm.controls['test_id'].disable();

    });
    this.getTests()
  }

  getTest(testId:number): void {
    this.testService.getTest(testId)
      .subscribe(test => (this.test = test));
  }

  onSubmit() {
    var sendData = this.testGroupForm.value ;

    const dataForm = {
      test_id:this.testId,
      name:sendData.name,
      description:sendData.description,
      num_questions:sendData.num_questions,
      points_per_question:sendData.points_per_question,
      sequence:sendData.sequence
    }

    if (this.id) {
      this.testGroupService
        .updateTestGroup(this.id,sendData)
        .subscribe(test => {
          this.router.navigate(['/admin/test/group/'+this.testId]);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.testGroupService
        .addTestGroup(dataForm)
        .subscribe(test => {
          this.router.navigate(['/admin/test/group/'+this.testId]);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

  getTests(): void {
    this.testService.getTests()
      .subscribe(tests => (this.tests = tests));
  }


  compareItemsTest(i1: any, i2: any) {
    return i1 && i2 && i1.id === i2.id;
  }
}
