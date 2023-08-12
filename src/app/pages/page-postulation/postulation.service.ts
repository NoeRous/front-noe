import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Institution, Phase, Position, PositionType, Postulation } from './Postulation';
import { environment } from 'src/environments/environment.development';
import { PhaseSequence } from '../page-inbox/inbox';
import { Announcement } from '../page-announcement/announcement';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

const httpOptionsFile = {
  headers: new HttpHeaders({
    "Accept": 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  postulationUrl = `${environment.apiURL}/postulation`; 
  institutionUrl = `${environment.apiURL}/announcement/institutions`; 
  positionTypeUrl = `${environment.apiURL}/position-type`; 
  positionUrl = `${environment.apiURL}/announcement`; 
  phaseUrl = `${environment.apiURL}/phase`; 

  urlUpload = `${environment.apiURL}/util/file-upload`; // environment.apiURL + '/util/file-upload';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }



  /** POST: add a new hero to the database */
  postulation(postulation: any): Observable<any> {
    return this.http.post<any>(this.postulationUrl, postulation, httpOptions)
      .pipe(
        catchError(this.handleError('postulation', postulation))
      );
  }

  getPostulations(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(this.postulationUrl)
      .pipe(
        catchError(this.handleError('getPostulations', []))
      );
  }

  getPhases(announcement:Announcement): Observable<Phase[]> {
    const url = `${this.phaseUrl}/announcement/${announcement.id}`;
    return this.http.get<Phase[]>(url)
      .pipe(
        catchError(this.handleError('getPhases', []))
      );
  }

  getPostulation(id:number): Observable<Postulation[]> {
    const url = `${this.postulationUrl}/${id}`;
    return this.http.get<Postulation[]>(url)
      .pipe(
        catchError(this.handleError('getPostulations', []))
      );
  }

  getInstitutions(id:number): Observable<Institution[]> {
    const url = `${this.institutionUrl}/${id}`;
    return this.http.get<Institution[]>(url)
      .pipe(
        catchError(this.handleError('getInstitutions', []))
      );
  }

  getPositionsType(): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(this.positionTypeUrl)
      .pipe(
        catchError(this.handleError('getPositionsType', []))
      );
  }

  getPositions(id_announcement:number,id_institution:number,id_position_type:number): Observable<Position[]> {
    const url = `${this.positionUrl}/${id_announcement}/${id_institution}/${id_position_type}`;
    return this.http.get<Position[]>(url)
      .pipe(
        catchError(this.handleError('getPositions', []))
      );
  }


  uploadImage(data: any): Observable<any> {
    return this.http.post<any>(this.urlUpload, data, httpOptionsFile)
      .pipe(
        catchError(this.handleError('uploadImage', data))
      );
  }

  getVerifyPostulationPhase(postulation:Postulation, phase:Phase): Observable<any> {
    const url = `${this.postulationUrl}/verify/${postulation.id}/${phase.id}`;
    return this.http.get<Postulation[]>(url)
      .pipe(
        catchError(this.handleError('getVerifyPostulationPhase', []))
      );
  }

}
