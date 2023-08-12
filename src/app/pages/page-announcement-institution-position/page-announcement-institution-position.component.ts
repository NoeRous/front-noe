import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { AnnouncementInstitutionPositionService } from './announcement-institution-position.service';
import { AnnouncementInstitutionPosition } from './announcement-institution-position';
import { AnnouncementService } from '../page-announcement/announcement.service';
import { Announcement } from '../page-announcement/announcement';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-announcement-institution-position',
  templateUrl: './page-announcement-institution-position.component.html',
  styleUrls: ['./page-announcement-institution-position.component.scss']
})
export class PageAnnouncementInstitutionPositionComponent {

  announcementId: any | undefined;
  announcementIdSelect: any | undefined;
  announcementInstitutionPositions: AnnouncementInstitutionPosition[] = [];
  announcements: Announcement[] = [];

  announcementSelectForm = this.fb.group({
    announcementId: [0],
  });

  selected = new FormControl(1, [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private announcementInstitutionPositionService: AnnouncementInstitutionPositionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private announcementService: AnnouncementService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.announcementId = params.get('announcementId');
      if (this.announcementId) {
        const id_ = this.announcementId;
       // this.announcementSelectForm.controls['announcementId'].setValue(id_);
        this.getAnnouncementInstitutionPosition(this.announcementId);
      }else{
        this.getAnnouncementInstitutionPosition();
      }

    })

    
    this.getAnnouncements();
  }

  getAnnouncementInstitutionPosition(announcementId = null): void {
    this.announcementInstitutionPositionService.getAnnouncementInstitutionPositions(announcementId)
      .subscribe(announcementInstitutionPositions => (this.announcementInstitutionPositions = announcementInstitutionPositions));
  }

  btnEdit(announcementInstitutionPosition: AnnouncementInstitutionPosition) {
    this.router.navigate(['/admin/announcement-institution-position/edit', announcementInstitutionPosition.id]);
  }

  btnDelete(announcementInstitutionPosition: AnnouncementInstitutionPosition) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: announcementInstitutionPosition, title: "Confirmar", message: `¿Esta seguro de eliminar ${announcementInstitutionPosition.announcement.name}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.announcementInstitutionPositionService.deleteAnnouncementInstitutionPosition(result.dataResp.data.id)
          .subscribe(announcementInstitutionPositions => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getAnnouncementInstitutionPosition();
          });
      }
    });
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => {
        this.announcements = announcements;


      });
  }

  pruebas(){
   
    this.announcementSelectForm.controls['announcementId'].setValue(2);
  }

  selectionChangeAnnouncement(item: any): void {
    console.log("item ", item.value);

    this.router.navigate(['/admin/announcement-institution-position', item.value]);

  }


}
