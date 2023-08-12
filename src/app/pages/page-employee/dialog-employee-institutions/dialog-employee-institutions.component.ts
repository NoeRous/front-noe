import { Component, Inject } from '@angular/core';
import { Institution, User } from '../../page-postulation/Postulation';
import { Announcement } from '../../page-announcement/announcement';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogUserRolesComponent } from '../../page-user/dialog-user-roles/dialog-user-roles.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/share/dialog-confirm/dialog-data';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { UserService } from '../../page-user/user.service';
import { PostulationService } from '../../page-postulation/postulation.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-dialog-employee-institutions',
  templateUrl: './dialog-employee-institutions.component.html',
  styleUrls: ['./dialog-employee-institutions.component.scss']
})
export class DialogEmployeeInstitutionsComponent {
  employee: Employee | undefined;
  announcements : Announcement[] = [];
  institutions : Institution[] = [];

  employeeInstitutionForm = this.fb.group({
    announcement_id: ['', Validators.required],
    institution_id: ['', Validators.required],
    employee_id: [0, Validators.required],
    
  });

  announcementSelectForm = this.fb.group({
    announcementId: [0],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private employeeService:EmployeeService,
    private postulationService:PostulationService,
    private messageService: MessageService
  ) {

    if (data.data) {
      this.employee = data.data;
    }

  }

  ngOnInit(): void {
    this.getAnnouncements(),
    this.getInstitutions(1)
    if (this.employee) {
      var employeeId = this.employee.id;
      this.employeeInstitutionForm.controls['employee_id'].setValue(employeeId);
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
    if (this.employee) {

      console.log('para  envio',this.employeeInstitutionForm.value)
     // var userRoleId = this.user.userRole.id;
      this.employeeService.addEmployeeInstitution( this.employeeInstitutionForm.value)
        .subscribe(roles => {
          this.dialogRef.close({roles});
          this.messageService.openSnackBar("Registro Editado");
        });
    }

  }

}
