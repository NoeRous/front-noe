import { Component, Inject } from '@angular/core';
import { DialogUserRolesComponent } from '../dialog-user-roles/dialog-user-roles.component';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../user';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { Announcement } from '../../page-announcement/announcement';
import { PostulationService } from '../../page-postulation/postulation.service';
import { Institution } from '../../page-postulation/Postulation';

@Component({
  selector: 'app-dialog-user-institutions',
  templateUrl: './dialog-user-institutions.component.html',
  styleUrls: ['./dialog-user-institutions.component.scss']
})
export class DialogUserInstitutionsComponent {

  user: User | undefined;
  announcements : Announcement[] = [];
  institutions : Institution[] = [];

  userInstitutionForm = this.fb.group({
    announcement_id: ['', Validators.required],
    institution_id: ['', Validators.required],
    user_id: [0, Validators.required],
    
  });

  announcementSelectForm = this.fb.group({
    announcementId: [0],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogUserInstitutionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private userService:UserService,
    private postulationService:PostulationService
  ) {

    if (data.data) {
      this.user = data.data;
    }

  }

  ngOnInit(): void {
    this.getAnnouncements(),
    this.getInstitutions(1)
    if (this.user) {
      var userId = this.user.id;
      this.userInstitutionForm.controls['user_id'].setValue(userId);
    }
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }
  getInstitutions(announcementId:number): void {
    this.postulationService.getInstitutions(announcementId)
      .subscribe(institutions => (this.institutions = institutions));
  }

  selectionChangeAnnouncement(item: any): void {
    console.log("item ", item.value);
    this.getInstitutions(item.value)
  }

  onSubmit() {
    if (this.user) {

      console.log('para  envio',this.userInstitutionForm.value)
      // var userRoleId = this.user.userRole.id;
      // this.userService.updateUserRole(userRoleId, this.rolUserForm.value)
      //   .subscribe(roles => {
      //     this.dialogRef.close({roles});
      //     this.messageService.openSnackBar("Registro Editado");
      //   });
    }

  }
}
