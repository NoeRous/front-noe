import { Component, Inject } from '@angular/core';
import { Phase} from '../../page-postulation/Postulation';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogUserRolesComponent } from '../../page-user/dialog-user-roles/dialog-user-roles.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { MessageService } from 'src/app/message.service';
import { RoleService } from '../../page-role/role.service';
import { UserService } from '../../page-user/user.service';
import { InboxService } from '../inbox.service';
import { Inbox } from '../inbox';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { Announcement } from '../../page-announcement/announcement';

@Component({
  selector: 'app-dialog-derived-inbox',
  templateUrl: './dialog-derived-inbox.component.html',
  styleUrls: ['./dialog-derived-inbox.component.scss']
})
export class DialogDerivedInboxComponent {
  postulation: Inbox | undefined;
  phases: Phase[] = [];
  nextPhases: any[] = [];
  nextPhaseId: any | undefined;
  postulationForDerived: Inbox[] = [];

  paginate: HandlePageEvent = {pageIndex:1, pageSize:10};
  announcementId:number | undefined;

  announcementCurrent : Announcement | undefined;
  derivedForm = this.fb.group({
    next_phase_id: [0, Validators.required],
    postulation_id: [0, Validators.required],
    announcement_id:[0, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DialogUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private messageService: MessageService,
    private inboxService:InboxService,
    private router: Router,
    private announcementService: AnnouncementService
  ) {
    if (data.data) {
      this.postulation = data.data;
    }

  }

  ngOnInit(): void {
    this.getAnnouncementCurrent()
   
    if (this.postulation) {
      var postulationId = this.postulation.id;
      this.derivedForm.controls['postulation_id'].setValue(postulationId);
    
    }
  }

  getNextPhases(announcementId:number): void {
    this.inboxService.getNextPhases(announcementId)
      .subscribe(nextPhases => {
        this.nextPhases = nextPhases;
      });
  }

  selectionChangeNextPhase(item: any): void {
    this.derivedForm.controls['next_phase_id'].setValue(item.value);
  }
  
  onSubmit() {
    if (this.postulation) {
      this.inboxService.derivedPostulation(this.derivedForm.value)
        .subscribe(postulations => {
          this.dialogRef.close({postulations});
          
          this.messageService.openSnackBar("Postulación habilitada siguiente fase");
        }, (error) => {
          console.error('Error al derivar postulaciones:', error);
        });
    }

  }

  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (this.announcementCurrent = announcement,
        this.announcementId = announcement.id,
        this.derivedForm.get('announcement_id')?.setValue(announcement.id),
        this.getNextPhases(announcement.id)
        ));
  }
}
