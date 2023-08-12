import { Component } from '@angular/core';
import { Tracking } from './tracking';
import { Paginate } from 'src/app/tools/paginate/paginate';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { Announcement } from '../page-announcement/announcement';
import { TrackingService } from './tracking.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { AnnouncementService } from '../page-announcement/announcement.service';

@Component({
  selector: 'app-page-tracking',
  templateUrl: './page-tracking.component.html',
  styleUrls: ['./page-tracking.component.scss']
})
export class PageTrackingComponent {

  postulations: Tracking[] = [];
  paginateInbox: Paginate | undefined;
  paginate: HandlePageEvent = {pageIndex:1, pageSize:10};
  announcements: Announcement[] = [];
  announcementId: any | undefined;
  announcementCurrent: Announcement | undefined;

  constructor(
    private trackingService: TrackingService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private announcementService: AnnouncementService,
  ) { }

  ngOnInit(): void {
    if (this.announcementId) {
    const id_ = this.announcementId;

     this.getPostulations(this.paginate,2);
    
    }
    if (this.paginate) {
      this.getPostulations(this.paginate,2);
    }
    this.getAnnouncements();
    this.getAnnouncementCurrent();
  }


  announcementSelectForm = this.fb.group({
    announcementId: [2],
  });


  getPostulations(pageEvent: HandlePageEvent,announcementId = 1,isValid=false): void {
    this.trackingService.getPaginatePostulations(pageEvent,announcementId,isValid)
      .subscribe(paginate => {
        if (paginate) {
          this.paginateInbox = paginate;
          this.postulations = this.paginateInbox.items
        }

      });
  }


  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => {
        this.announcements = announcements;
      });
  }

  selectionChangeAnnouncement(item: any): void {
    console.log("item ", item.value);

    this.announcementId = item.value
    
    this.getPostulations(this.paginate,this.announcementId);

    this.router.navigate(['/admin/tracking']);
  }

  btnShowDetails(postulation : any){

    console.log('postulation  ---> ',postulation)
    this.router.navigate(['/admin/tracking/details/', postulation.id]);
  }

  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (this.announcementCurrent = announcement));
  }


}
