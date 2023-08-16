import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { PostulationService } from '../postulation.service';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { Institution, Position, PositionType } from '../Postulation';
import { Announcement } from '../../page-announcement/announcement';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-form-postulation',
  templateUrl: './page-form-postulation.component.html',
  styleUrls: ['./page-form-postulation.component.scss']
})
export class PageFormPostulationComponent {

  id: any | undefined;
  institutions: Institution[] = [];
  positionsType: PositionType[] = [];
  positions: Position[] = [];
  announcementCurrent: Announcement | undefined;
  announcentId: any | undefined;
  institutionId: any | undefined;


  postulacionForm = this.fb.group({
    position_id: ['', Validators.required],
    institution_id: ['', Validators.required],
    position_type_id: ['', Validators.required],
    voucher: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    announcement_id: ['', Validators.required],
    voucher_url: ['', Validators.required],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private postulationService: PostulationService,
    private announcementService: AnnouncementService,
    private messageService: MessageService) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getAnnouncementCurrent();

  }

  onSubmit() {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Esta seguro de realizar su postulación?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.postulationService.postulation(this.postulacionForm.value).subscribe(resp => {
          if (resp.id) {
            //this.postulacionForm.reset();
            this.router.navigate(['/admin/postulation']);
            this.messageService.openSnackBar("Registrado correctamente");
          } else {
            this.messageService.openSnackBar('Error comuniquese con la DGFM.');
          }
        });
      }
    });
  }

  handleFileInputChange(l: any): void {
    //this.file_store = l;
    if (l.length) {
      const file = l[0];

      var formData = new FormData();
      formData.append('file', file);

      this.postulationService.uploadImage(formData).subscribe((data) => {
        this.postulacionForm.controls['voucher_url'].setValue(data.filename);
      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }
  }

  getInstitutions(announcentId: number): void {
    this.postulationService.getInstitutions(announcentId)
      .subscribe(institutions => (this.institutions = institutions));
  }

  getPositionsType(): void {
    this.postulationService.getPositionsType()
      .subscribe(positionsType => (this.positionsType = positionsType));
  }

  getPositions(tipoCargoId: number): void {
    this.postulationService.getPositions(this.announcentId, this.institutionId, tipoCargoId)
      .subscribe(positions => (this.positions = positions));
  }

  doSomething(item: any) {
    this.getPositions(item.value)
  }

  doSomethingTypePosition(item: any) {
    this.institutionId = item.value
    this.postulacionForm.get('position_type_id')?.reset();
    this.postulacionForm.get('position_id')?.reset();
    this.getPositionsType()
  }
  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent().subscribe(announcement => {
      this.announcementCurrent = announcement;
      this.announcentId = announcement.id
      this.postulacionForm.get('announcement_id')?.setValue(this.announcentId);
      this.getInstitutions(this.announcentId)
    });
  }

}
