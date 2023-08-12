import { Component } from '@angular/core';
import { InstitutionPosition } from '../institution-position';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { InstitutionPositionService } from '../institution-position.service';
import { MessageService } from 'src/app/message.service';
import { Institution } from '../../page-institution/institution';
import { InstitutionService } from '../../page-institution/institution.service';
import { Position } from '../../page-position/position';
import { PositionService } from '../../page-position/position.service';


@Component({
  selector: 'app-page-form-institution-position',
  templateUrl: './page-form-institution-position.component.html',
  styleUrls: ['./page-form-institution-position.component.scss']
})
export class PageFormInstitutionPositionComponent {

  id: any | undefined;

  institutionPosition: InstitutionPosition[] | undefined;

  institutions: Institution[] = [];
  positions: Position[] = [];

  institutionPositionForm = this.fb.group({
    position: ['', Validators.required],
    institution: ['', Validators.required],
    enabled: [true]

  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private institutionPositionService: InstitutionPositionService,
    private institutionService: InstitutionService,
    private router: Router,
    private messageService: MessageService,
    private positionService: PositionService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.institutionPositionService.getInstitutionPosition(this.id)
          .subscribe(announcement => {
            this.institutionPositionForm.patchValue(announcement);
          });
      }

    });

    this.getInstitutions();
    this.getPositions()

  }

  onSubmit() {
    var sendData = this.institutionPositionForm.value ;
    if (this.id) {
      this.institutionPositionService
        .updateInstitution(this.id,sendData)
        .subscribe(institutionPosition => {
          this.router.navigate(['/admin/institution-position']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.institutionPositionService
        .addInstitution(sendData)
        .subscribe(institutionPosition => {
          this.router.navigate(['/admin/institution-position']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }


  getInstitutions(): void {
    this.institutionService.getInstitutions()
      .subscribe(institutions => (this.institutions = institutions));
  }

  getPositions(): void {
    this.positionService.getPositions()
      .subscribe(positions => (this.positions = positions));
  }

}
