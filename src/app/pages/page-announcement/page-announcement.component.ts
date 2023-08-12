import { Component } from '@angular/core';
import { Announcement } from './announcement';
import { AnnouncementService } from './announcement.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-announcement',
  templateUrl: './page-announcement.component.html',
  styleUrls: ['./page-announcement.component.scss']
})
export class PageAnnouncementComponent {
  announcements: Announcement[] = [];


  constructor(
    private announcementService: AnnouncementService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAnnouncements()
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }

  btnEdit(announcement: Announcement) {
    this.router.navigate(['/admin/announcement/edit', announcement.id]);
  }


  btnAnnouncementInstitutionPosition(announcement: Announcement) {
    this.router.navigate(['/admin/announcement-institution-position', announcement.id]);
  }

  btnDelete(announcement: Announcement) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: announcement, title: "Confirmar", message: `¿Esta seguro de eliminar ${announcement.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.announcementService.deleteAnnouncement(result.dataResp.data.id)
          .subscribe(announcements => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getAnnouncements();
          });



      }
    });
  }

}
