import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MessageService } from 'src/app/message.service';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-page-person',
  templateUrl: './page-person.component.html',
  styleUrls: ['./page-person.component.scss']
})
export class PagePersonComponent {

  persons: Person[] = [];


  constructor(
    private personService: PersonService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPersons()
  }

  getPersons(): void {
    this.personService.getPersons()
      .subscribe(persons => (this.persons = persons));
  }

  btnEdit(person: Person) {
    this.router.navigate(['/admin/person/edit', person.id]);
  }


  btnPersonInstitutionPosition(person: Person) {
    this.router.navigate(['/admin/person-institution-position', person.id]);
  }

  btnDelete(person: Person) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { data: person, title: "Confirmar", message: `¿Esta seguro de eliminar ${person.identity_card}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.personService.deletePerson(result.dataResp.data.id)
          .subscribe(persons => {
            this.messageService.openSnackBar("Se Elimino el Registro");
            this.getPersons();
          });



      }
    });
  }

}
