import { Component } from '@angular/core';
import { Test } from './test';
import { TestService } from './test.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent {

  tests: Test[] = [];


  constructor(
    private testService: TestService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTests()
  }

  getTests(): void {
    this.testService.getTests()
      .subscribe(tests => (this.tests = tests));
  }

  btnEdit(test: Test) {
    this.router.navigate(['/admin/test/edit', test.id]);
  }

  btnDelete(test: Test) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: test, title: "Confirmar", message: `¿Esta seguro de eliminar ${test.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.testService.deleteTest(result.dataResp.data.id)
          .subscribe(tests => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getTests();
          });



      }
    });
  }

  btnTestGroup(test: Test) {
    console.log(test)
    this.router.navigate(['/admin/test/group/', test.id]);
  }

}
