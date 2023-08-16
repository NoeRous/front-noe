import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterPersonService } from './register-person.service';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Gender } from './gender';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-page-register-person',
  templateUrl: './page-register-person.component.html',
  styleUrls: ['./page-register-person.component.scss']
})
export class PageRegisterPersonComponent {


  genders: Gender[] = [];

  personForm = this.fb.group({
    identity_card: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(9)]],
    last_name: ['', Validators.pattern('^[A-Za-z]*$')],
    mothers_last_name: ['', Validators.pattern('^[A-Za-z]*$')],
    husband_last_name: ['', Validators.pattern('^[A-Z a-z]*$')],
    second_name: ['', Validators.pattern('^[A-Za-z]*$')],
    firts_name: ['', [Validators.required, Validators.pattern('^[A-Za-z]*$')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone: ['', Validators.pattern('^[0-9]*$')],
    personal_number: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]],
    birth_date: ['', Validators.required],
    rda_number: [''],
    t_part_gender_id: ['', Validators.required],
    identity_card_complement: ['', [Validators.pattern('^[0-9A-Za-z][A-Za-z]*$')]],
  });

  constructor(private fb: FormBuilder, public dialog: MatDialog, private registerPersonService: RegisterPersonService, private router: Router) { }


  ngOnInit(): void {
    this.getGenders();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn("datos form:", this.personForm.value);
    // The server will generate the id for this new hero
    //aqui

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Esta seguro de realizar el registro?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.registerPersonService
          .addPerson(this.personForm.value)
          .subscribe(resp => {
            if (resp.id) {
              this.personForm.reset();
              this.router.navigate(['/auth/login']);
            } else {
              this.router.navigate(['/auth/register']);
              // Aquí puedes agregar el código que deseas ejecutar cuando no se recibe un token de acceso válido
              console.warn('No se recibió un token de acceso válido. No se redirigirá al panel de administración.');
            }
          });
      }
    });
  }

  getGenders(): void {
    this.registerPersonService.getGenders()
      .subscribe(genders => (this.genders = genders));
  }
}
