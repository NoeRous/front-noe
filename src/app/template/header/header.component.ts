import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { DialogUserPasswordComponent } from 'src/app/pages/page-user/dialog-user-password/dialog-user-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  username:string = 'sss'
  rol:string = 'rol'
  person:any;
  user:any;

  constructor(private messageService: MessageService,
    public dialog: MatDialog,
    
    private router:Router) { }


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.rol =  localStorage.getItem('rol')??'Error';
  this.user =  localStorage.getItem('userId')??'Error';
  this.username =  localStorage.getItem('username')??'Error';
  let newObject = localStorage.getItem("person")??'';
  this.person =  JSON.parse(newObject);
  
}

  btnSalir(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  btnDialogPassword(user_id:number){
    console.log('user_user_id',user_id)
    const dialogRef = this.dialog.open(DialogUserPasswordComponent, {data:{data:user_id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //this.getEmployees();
    });

  }

}
