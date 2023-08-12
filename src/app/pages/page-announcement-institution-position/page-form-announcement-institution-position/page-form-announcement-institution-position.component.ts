import { Component } from '@angular/core';
import { AnnouncementInstitutionPosition } from '../announcement-institution-position';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AnnouncementInstitutionPositionService } from '../announcement-institution-position.service';
import { MessageService } from 'src/app/message.service';
import { InstitutionPosition } from '../../page-institution-position/institution-position';
import { InstitutionPositionService } from '../../page-institution-position/institution-position.service';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { Announcement } from '../../page-announcement/announcement';

@Component({
  selector: 'app-page-form-announcement-institution-position',
  templateUrl: './page-form-announcement-institution-position.component.html',
  styleUrls: ['./page-form-announcement-institution-position.component.scss']
})
export class PageFormAnnouncementInstitutionPositionComponent {


  id: any | undefined;

  announcementInstitutionPosition: AnnouncementInstitutionPosition[] | undefined;
  institutionPositions: InstitutionPosition[] = [];
  announcements: Announcement[] = [];

  announcementInstitutionPositionForm = this.fb.group({
    institutionPosition: ['', Validators.required],
    announcement: ['', Validators.required],
    number_available: ['']

  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private announcementInstitutionPositionService: AnnouncementInstitutionPositionService,
    private announcementService: AnnouncementService,
    private router: Router,
    private messageService: MessageService,
    private institutionPositionService: InstitutionPositionService,

  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.announcementInstitutionPositionService.getAnnouncementInstitutionPosition(this.id)
          .subscribe(announcementInstitutionPosition => {
            this.announcementInstitutionPositionForm.patchValue(announcementInstitutionPosition);
          });
      }

    });

    this.getInstitutionPositions()
    this.getAnnouncements();
  }

  onSubmit() {
    var sendData = this.announcementInstitutionPositionForm.value;
    if (this.id) {
      this.announcementInstitutionPositionService
        .updateAnnouncementInstitutionPosition(this.id, sendData)
        .subscribe(announcementInstitutionPosition => {
          this.router.navigate(['/admin/announcement-institution-position']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.announcementInstitutionPositionService
        .addAnnouncementInstitutionPosition(sendData)
        .subscribe(announcementInstitutionPosition => {
          this.router.navigate(['/admin/announcement-institution-position']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }


  getInstitutionPositions(): void {
    this.institutionPositionService.getInstitutionPositions()
      .subscribe(institutionPositions => (this.institutionPositions = institutionPositions));
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }



}
