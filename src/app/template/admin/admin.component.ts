import { Component } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {


  scriptsLocal: string[] = ['plugins-bundle', 'scripts-bundle'];


  constructor(
  
   // private remoteScriptsService: RemoteScriptsService
  ) {
   // this.remoteScriptsService.Loading(this.scriptsLocal);


   
  }

}
