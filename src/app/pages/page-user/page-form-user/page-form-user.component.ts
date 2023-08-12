import { Component } from '@angular/core';
import { Announcement } from '../../page-announcement/announcement';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { MessageService } from 'primeng/api';
import { Role } from '../../page-role/role';
import { RoleService } from '../../page-role/role.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonService } from '../../page-person/person.service';
import { RegisterPersonService } from '../../page-register-person/register-person.service';
import { Gender } from '../../page-register-person/gender';

@Component({
  selector: 'app-page-form-user',
  templateUrl: './page-form-user.component.html',
  styleUrls: ['./page-form-user.component.scss']
})
export class PageFormUserComponent {
  // id: any | undefined;

  // announcementCurrent: Announcement | undefined;
  roles: Role[] | undefined

  genders: Gender[] | undefined


  userForm = this.fb.group({
    identity_card: ['', Validators.required],
    last_name: [''],
    mothers_last_name: [''],
    husband_last_name: [''],
    second_name: [''],
    firts_name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    phone: [''],
    personal_number: ['', Validators.required],
    birth_date: ['', Validators.required],
    role_id:['', Validators.required],
    position:['', Validators.required],
    t_part_gender_id: ['',Validators.required],
    identity_card_complement: [''],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private personService: PersonService,
    private roleService: RoleService,
    private announcementService: AnnouncementService,
    public dialog: MatDialog,
    public registerPersonService: RegisterPersonService
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getGenders();
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn("datos form:",this.userForm.value);
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: { title: "Confirmar", message: `¿Esta seguro de realizar el registro?` },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.status) {
            this.personService
            .addPersonEmployee(this.userForm.value)
            .subscribe(resp => {
              if (resp.id) {
                this.userForm.reset();
                this.router.navigate(['/admin/user']);
              } else {
                this.router.navigate(['/admin/user/create']);
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
