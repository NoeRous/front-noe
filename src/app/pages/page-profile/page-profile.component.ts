import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageProfileService } from './page-profile.service';
import { Router } from '@angular/router';
import { PersonService } from '../page-person/person.service';
import { Person } from '../page-person/person';
import { PostulationService } from '../page-postulation/postulation.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent {


  person: Person | undefined;
  username:string | undefined;
  profileForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private pageLoginService: PageProfileService,
    private router: Router,
    private postulationService: PostulationService,
    private personService: PersonService,
  ) { }

  ngOnInit(): void {
    this.getPerson();
  }

  onSubmit() {
    console.warn("datos form:", this.profileForm.value);
  }

  getPerson(): void {
    this.personService.getPersonProfile()
      .subscribe(resp =>{
        this.person = resp.person
        this.username = resp.username
      });
  }

  onFileInput(event:any){
    if (event.length) {
      const file = event[0];

      var formData = new FormData();
      formData.append('file', file);

      this.postulationService.uploadImage(formData).subscribe((data) => {
       
        console.log("data.filename ", data.filename);
        

      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }

  }

}
