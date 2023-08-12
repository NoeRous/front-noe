import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-form-announment',
  templateUrl: './page-form-announment.component.html',
  styleUrls: ['./page-form-announment.component.scss']
})
export class PageFormAnnounmentComponent {


  id: any | undefined;

  announcements: Announcement[] | undefined

  announcementForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    date_init: [''],
    date_end: [''],
    cite: [''],

  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.announcementService.getAnnouncement(this.id)
          .subscribe(announcement => {
            this.announcementForm.patchValue(announcement);
          });
      }

    });

  }

  onSubmit() {
    var sendData = this.announcementForm.value ;
    if (this.id) {
      this.announcementService
        .updateAnnouncement(this.id,sendData)
        .subscribe(announcement => {
          this.router.navigate(['/admin/announcement']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.announcementService
        .addAnnouncement(sendData)
        .subscribe(announcement => {
          this.router.navigate(['/admin/announcement']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }


  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }


}
