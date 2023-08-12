import { Component } from '@angular/core';
import { PositionType } from '../position-type';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PositionTypeService } from '../position-type.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-form-position-type',
  templateUrl: './page-form-position-type.component.html',
  styleUrls: ['./page-form-position-type.component.scss']
})
export class PageFormPositionTypeComponent {


  id: any | undefined;

  positionType: PositionType[] | undefined

  positionTypeForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private positionTypeService: PositionTypeService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.positionTypeService.getPositionType(this.id)
          .subscribe(positionType => {
            this.positionTypeForm.patchValue(positionType);
          });
      }

    });

  }

  onSubmit() {
    var sendData = this.positionTypeForm.value ;
    if (this.id) {
      this.positionTypeService
        .updatePositionType(this.id,sendData)
        .subscribe(positionType => {
          this.router.navigate(['/admin/position-type']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.positionTypeService
        .addPositionType(sendData)
        .subscribe(announcement => {
          this.router.navigate(['/admin/position-type']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }

}
