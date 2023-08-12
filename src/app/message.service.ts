import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class MessageService {
  messages: string[] = [];


  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  reponseData(error: any) {

    console.log("error :: ", error.error);





    switch (error.status) {
      case 401:
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        break;


      case 404:
        var dataResp = JSON.parse(error.error);
        this.openSnackBarError(dataResp.message);
        break;


        case 422:
          var dataResp = JSON.parse(error.error);
          this.openSnackBarError(dataResp.message);
          break;


      default:
        break;
    }


  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", { duration: 3 * 1000 });
  }

  openSnackBarError(message: string) {
    this._snackBar.open(message, "Cerrar", { duration: 3 * 1000, panelClass: ['red-snackbar','blue-snackbar']});
  }


}
