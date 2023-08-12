import { Component } from '@angular/core';
import { AnnouncementService } from '../page-announcement/announcement.service';
import { Announcement } from '../page-announcement/announcement';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent {
  announcementCurrent: Announcement | undefined;

  constructor(

    private announcementService: AnnouncementService,

  ) { }

  ngOnInit(): void {
    this.getAnnouncementCurrent();
  }

  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (this.announcementCurrent = announcement));
  }

}
