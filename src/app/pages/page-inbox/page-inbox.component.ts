import { Component } from '@angular/core';
import { Inbox } from './inbox';
import { InboxService } from './inbox.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { Paginate } from 'src/app/tools/paginate/paginate';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { PageEvent } from '@angular/material/paginator';
import { AnnouncementService } from '../page-announcement/announcement.service';
import { Announcement } from '../page-announcement/announcement';
import { FormBuilder } from '@angular/forms';
import { Postulation, User } from '../page-postulation/Postulation';
import { DialogUserRolesComponent } from '../page-user/dialog-user-roles/dialog-user-roles.component';
import { DialogDerivedInboxComponent } from './dialog-derived-inbox/dialog-derived-inbox.component';
import { EmployeeService } from '../page-employee/employee.service';
import { EmployeeInstitution } from '../page-employee/employee';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-page-inbox',
  templateUrl: './page-inbox.component.html',
  styleUrls: ['./page-inbox.component.scss']
})
export class PageInboxComponent {
  urlApi = `${environment.apiURL}`; 
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`; 
  postulations: Inbox[] = [];
  paginateInbox: Paginate | undefined;
  paginate: HandlePageEvent = {pageIndex:1, pageSize:10};
  announcements: Announcement[] = [];
  nextPhases: any[] = [];
  nextPhaseId: any | undefined;
  announcementId: any | undefined;
  institutionId: any | undefined;
  announcementIdSelect: any | undefined;
  isValid : any | undefined;

  postulationForValid: Inbox[] = [];
  postulationForDerived: Inbox[] = [];
  announcementCurrent: Announcement | undefined;
  employeeInstitutions: EmployeeInstitution[] = [];

  loading = true

  constructor(
    private inboxService: InboxService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private announcementService: AnnouncementService,
    private employeeService: EmployeeService
  ) { }

  announcementSelectForm = this.fb.group({
    announcementId: [''],
    institutionId:['']
  });


  ngOnInit(): void {
    this.getAnnouncementCurrent();
    this.announcementId = 2
    this.announcementSelectForm.controls['announcementId'].setValue(this.announcementId);
    if (this.announcementId) {
     const id_ = this.announcementId;
     this.getPostulations(this.paginate,this.announcementId);
    }
    if (this.paginate) {
      this.getPostulations(this.paginate,this.announcementId);
    }

    this.getAnnouncements()
    this.getEmployeeInstitutions(2)
    this.getNextPhases()
  }


  getPostulations(pageEvent: HandlePageEvent,announcementId = 1,institutionId = 0): void {
    this.inboxService.getPaginatePostulations(pageEvent,announcementId,institutionId)
      .subscribe(paginate => {
        if (paginate) {
          this.paginateInbox = paginate;
          this.postulations = this.paginateInbox.items
        }else{
          this.postulations = []
        }
        this.loading = false
      });
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => {
        this.announcements = announcements;
      });
  }

  getEmployeeInstitutions(announcementId:number): void {
    this.employeeService.getEmployeeInstitutions(announcementId)
      .subscribe(employeeInstitutions => {
        this.employeeInstitutions = employeeInstitutions;
      },(error) => {
       this.postulations = [];
      });
  }


  getNextPhases(): void {
    this.inboxService.getNextPhases()
      .subscribe(nextPhases => {
        this.nextPhases = nextPhases;
      });
  }


  selectionChangeAnnouncement(item: any): void {

    this.announcementId = item.value

    this.getEmployeeInstitutions(this.announcementId)
    
    this.getPostulations(this.paginate,this.announcementId);

    this.router.navigate(['/admin/inbox']);
  }
  selectionChangeInstitution(item: any): void {
    if(item){
      this.institutionId = item.value
      this.getPostulations(this.paginate,this.announcementId,this.institutionId);
      this.router.navigate(['/admin/inbox']);
    }else{
      this.getPostulations(this.paginate,this.announcementId);
      this.router.navigate(['/admin/inbox']);
    }
  }

  selectionChangeNextPhase(item: any): void {

    this.nextPhaseId = item.value
    
    this.getPostulations(this.paginate,this.announcementId);

    this.router.navigate(['/admin/inbox']);

  }
  handlePageEvent(e: PageEvent) {
    var index = e.pageIndex +1
    this.paginate.pageIndex= index;
    this.paginate.pageSize= e.pageSize;
    this.getPostulations(this.paginate,this.announcementId);
  }

  btnDialogDerived(postulation:Postulation){
    const dialogRef = this.dialog.open(DialogDerivedInboxComponent, {data:{data:postulation}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getPostulations(this.paginate,this.announcementId);
    });

  }

  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (this.announcementCurrent = announcement));
  }
}
