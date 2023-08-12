import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';
import { Paginate } from 'src/app/tools/paginate/paginate';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  apiUrl = `${environment.apiURL}/postulation`;
  apiPhaseUrl = `${environment.apiURL}/phase`; 

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TrackingService');
  }



  getPaginatePostulations(e: HandlePageEvent,announcementId:number,isValid:boolean): Observable<Paginate | null > {
    const url = `${this.apiUrl}/tracking/${announcementId}`;
    const options = e ?
    { params: new HttpParams().set('page', e.pageIndex).set('limit', e.pageSize).set('isValid', isValid) } : {};

    return this.http.get<Paginate>(url, options)
      .pipe(
        catchError(this.handleError('getQuestions', null))
      );
  }
}
