import { Component } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { DialogUserRolesComponent } from './dialog-user-roles/dialog-user-roles.component';
import { DialogUserInstitutionsComponent } from './dialog-user-institutions/dialog-user-institutions.component';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent {

  users: User[] = [];


  constructor(
    private announcementService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAnnouncements()
  }

  getAnnouncements(): void {
    this.announcementService.getUsers()
      .subscribe(users => (this.users = users));
  }

  btnDialogRoles(user:User){


    const dialogRef = this.dialog.open(DialogUserRolesComponent, {data:{data:user}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAnnouncements();
    });

  }

  btnDialogInstitutions(user:User){
    const dialogRef = this.dialog.open(DialogUserInstitutionsComponent, {data:{data:user}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAnnouncements();
    });

  }

}
