import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { PostulationService } from './postulation.service';
import { Phase, Postulation } from './Postulation';
import { environment } from 'src/environments/environment.development';
import { AnnouncementService } from '../page-announcement/announcement.service';
import { Announcement } from '../page-announcement/announcement';
import { of, switchMap } from 'rxjs';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-page-postulation',
  templateUrl: './page-postulation.component.html',
  styleUrls: ['./page-postulation.component.scss']
})
export class PagePostulationComponent {

  urlApi = `${environment.apiURL}`; 
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`; 

  btnRegister(){
    console.log("register");
    
  }
  postulationId: any | undefined;
  postulations: Postulation[] = [];
  announcementCurrent: Announcement | undefined;
  phases: Phase[] = [];

  loading: boolean = true;

  constructor(
    private postulationService: PostulationService,
    private announcementService: AnnouncementService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPostulations();
    this.getAnnouncementCurrent();
  }

  clear(table: Table) {
    table.clear();
  }

  getPostulations(): void {
    this.postulationService.getPostulations().subscribe(
      (postulations) => {
        this.postulations = postulations;
        this.loading = false; // Se detiene la carga después de recibir los datos exitosamente
      },
      (error) => {
        console.error('Error al obtener las postulaciones:', error);
        this.loading = false; // Importante establecer a falso en caso de error también
      }
    );
  }


  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (this.announcementCurrent = announcement));
  }

  postulationDetails(postulation: Postulation) {
    this.router.navigate(['/admin/postulation/details/', postulation.id]);
  }

  postulationTest(postulation: Postulation) {
    this.router.navigate(['/admin/postulation-test/', postulation.id]);
  }

  btnVerifyPhasePostulation(postulation: Postulation, phase: Phase) {

    this.postulationService.getVerifyPostulationPhase(postulation, phase).pipe(
      switchMap((res) => {

        if (phase.id == 1 && res === true) {
          this.postulationDetails(postulation);
        }

        if (phase.id == 2 && res === true) {
          this.postulationTest(postulation);
        }
        return of(null);
      })
    ).subscribe(() => {
      // Aquí puedes realizar acciones adicionales después de completar el flujo
    });
  }

  getPhases(): void {
    if (this.announcementCurrent) {
      this.postulationService.getPhases(this.announcementCurrent)
        .subscribe(phases => (this.phases = phases));
    } else {
      console.log('entro aqui')
    }
  }
  getSeverity(status: string)  {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'info'; // Otra opción por defecto
    }
  }
}
