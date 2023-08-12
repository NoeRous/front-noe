import { Component } from '@angular/core';
import { Test } from '../test';
import { Announcement } from '../../page-announcement/announcement';
import { Position } from '../../page-postulation/Postulation';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { TestService } from '../test.service';
import { PositionService } from '../../page-position/position.service';
import { AnnouncementService } from '../../page-announcement/announcement.service';

@Component({
  selector: 'app-page-form-test',
  templateUrl: './page-form-test.component.html',
  styleUrls: ['./page-form-test.component.scss']
})
export class PageFormTestComponent {

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  id: any | undefined;

  test: Test[] | undefined;

  announcements: Announcement[] = [];
  positions: Position[] = [];


  testForm = this.fb.group({
    name:['',Validators.required],
    description:['',Validators.required],
    total_questions:['',Validators.required],
    is_random:['',Validators.required],
    date_init:['',Validators.required],
    date_end:['',Validators.required],
    time:['',Validators.required],
    num_attemps:['',Validators.required],
    minimum_score:['',Validators.required],
    questions_per_page:['',Validators.required],
    announcement_id: ['', Validators.required],
    position_id: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private testService: TestService,
    private positionService: PositionService,
    private announcementService: AnnouncementService,

  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.testService.getTest(this.id)
          .subscribe(test => {
            this.testForm.patchValue(test);
          });
      }

    });
    this.getPositions()
    this.getAnnouncements()

  }

  onSubmit() {
    var sendData = this.testForm.value ;
    if (this.id) {
      this.testService
        .updateTest(this.id,sendData)
        .subscribe(test => {
          this.router.navigate(['/admin/test']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.testService
        .addTest(sendData)
        .subscribe(test => {
          this.router.navigate(['/admin/test']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

  getPositions(): void {
    this.positionService.getPositions()
      .subscribe(positions => (this.positions = positions));
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }


}
