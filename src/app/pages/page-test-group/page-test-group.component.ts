import { Component } from '@angular/core';
import { TestGroup } from './test-group';
import { TestGroupService } from './test-group.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { TestService } from '../page-test/test.service';
import { Test } from '../page-test/test';

@Component({
  selector: 'app-page-test-group',
  templateUrl: './page-test-group.component.html',
  styleUrls: ['./page-test-group.component.scss']
})
export class PageTestGroupComponent {

  testGroups: TestGroup[] = [];
  testId:any | undefined;
  test: Test | undefined;

  constructor(
    private testGroupService: TestGroupService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('testId');
      this.getTestGroupsByTest(this.testId);
      this.getTest(this.testId);
      
    })
  }

  getTestGroupsByTest(testId:number): void {
    this.testGroupService.getTestGroupsByTest(testId)
      .subscribe(testGroups => {
        this.testGroups = testGroups;
      });
  }
  getTestGroups(): void {
    this.testGroupService.getTestGroups()
      .subscribe(testGroups => (this.testGroups = testGroups));
  }

  getTest(testId:number): void {
    this.testService.getTest(testId)
      .subscribe(test => (this.test = test));
  }

  btnEdit(testGroup: TestGroup) {
    this.router.navigate(['/admin/test/group/'+this.testId+'/edit', testGroup.id]);
  }

  btnDelete(test: TestGroup) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: test, title: "Confirmar", message: `¿Esta seguro de eliminar ${test.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.testGroupService.deleteTestGroup(result.dataResp.data.id)
          .subscribe(testGroups => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getTestGroupsByTest(this.testId);
          });
      }
    });
  }

  btnAnnouncementInstitutionPosition(announcement: TestGroup) {
    //this.router.navigate(['/admin/test', announcement.id]);
    this.router.navigate(['/admin/test']);
  }

  btnQuestions(testGroup: TestGroup){
    
    this.router.navigate(['/admin/test', this.testId, 'group',testGroup.id,'question' ]);
  }

}
