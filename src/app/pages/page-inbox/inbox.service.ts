import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Inbox } from './inbox';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { Paginate } from 'src/app/tools/paginate/paginate';

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
export class InboxService {

  apiUrl = `${environment.apiURL}/postulation`;
  apiPhaseUrl = `${environment.apiURL}/phase`; 

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('InboxService');
  }



  getPaginatePostulations(e: HandlePageEvent,announcementId:number,institutionId:number = 0,positionId:number): Observable<any | null > {
    const url = `${this.apiUrl}/inbox/${announcementId}`;
    const options = e ?
    { params: new HttpParams().set('page', e.pageIndex).set('limit', e.pageSize).set('institutionId', institutionId).set('positionId', positionId) } : {};

    return this.http.get<any>(url, options)
      .pipe(
        catchError(this.handleError('getQuestions', null))
      );
  }

  validOrInvalidPostulation(isValid: boolean, postulations: any[]): Observable<any> {
    const url = `${this.apiUrl}/valid`;
    const body = {
      isValid:isValid,
      postulations: postulations
    };
    return this.http.post(url, body)
      .pipe(
        catchError(this.handleError('validOrInvalidPostulation'))
      );
  }

  derivedPostulation(postulation: any): Observable<any> {
    const url = `${this.apiUrl}/derived`;
    const body = {
      next_phase_id: postulation.next_phase_id,
      postulation_id: postulation.postulation_id,
      announcement_id: postulation.announcement_id
    };
    
    return this.http.post(url, body)
      .pipe(
        catchError(this.handleError('derivedPostulation'))
      );
  }

  /* metodo para enviar a un area */

  getNextPhases(announcementId:number): Observable<any[]> {
    const url = `${this.apiPhaseUrl}/next-phase/${announcementId}`;

    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getNextPhases', []))
      );
  }



}
