import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageLoginService } from './page-login.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  hide = true;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required],
  });

  constructor(private messageService: MessageService,
    private fb: FormBuilder, 
    private pageLoginService: 
    PageLoginService, 
    private router:Router,
   
    ) { }

  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.warn("datos form:",this.loginForm.value);
  //     // The server will generate the id for this new hero
  //     this.pageLoginService
  //     .login(this.loginForm.value)
  //     .subscribe(resp => {
  //       console.log("resp", resp);
  //       this.loginForm.reset();
  //       this.router.navigate(['/admin/dashboard']);
        
  //     });
  // }

  onSubmit() {
    console.warn("datos form:", this.loginForm.value);
    this.pageLoginService.login(this.loginForm.value).subscribe(resp => {
      console.log("resp", resp);
      
      var token = resp.access_token;
      var username_ = resp.username_;
      var rol_ = resp.rol_;
      var userId_ = resp.userId_;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username_);
      localStorage.setItem('rol', rol_);
      localStorage.setItem('userId', userId_);
      localStorage.setItem('person',  JSON.stringify(resp.person));

      if (resp.access_token) {
        this.loginForm.reset();
        this.router.navigate(['/admin/dashboard']);
      } else {
       // this.loginForm.reset();
       // this.router.navigate(['/auth/login']);
        // Aquí puedes agregar el código que deseas ejecutar cuando no se recibe un token de acceso válido
        console.warn('No se recibió un token de acceso válido. No se redirigirá al panel de administración.');
      }
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }



}
