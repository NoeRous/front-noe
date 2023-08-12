import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { AnnouncementInstitutionPosition } from './announcement-institution-position';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnnouncementInstitutionPositionService {

  apiUrl = `${environment.apiURL}/announcement-institution-position`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AnnouncementInstitutionPositionservice');
  }

 
  getAnnouncementInstitutionPositions(announcementId:any): Observable<AnnouncementInstitutionPosition[]> {
    var url = `${this.apiUrl}`;
    if (announcementId) {
      url = `${this.apiUrl}?announcementId=${announcementId}`;
    }
    return this.http.get<AnnouncementInstitutionPosition[]>(url)
      .pipe(
        catchError(this.handleError('getAnnouncementInstitutionPositions', []))
      );
  }


  getAnnouncementInstitutionPosition(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AnnouncementInstitutionPosition>(url)
      .pipe(
        catchError(this.handleError('getAnnouncementInstitutionPosition', null))
      );
  }


  searchAnnouncementInstitutionPosition(term: string): Observable<AnnouncementInstitutionPosition[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<AnnouncementInstitutionPosition[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<AnnouncementInstitutionPosition[]>('searchAnnouncementInstitutionPosition', []))
      );
  }


  addAnnouncementInstitutionPosition(announcementInstitutionPosition: any): Observable<AnnouncementInstitutionPosition> {
    return this.http.post<AnnouncementInstitutionPosition>(this.apiUrl, announcementInstitutionPosition, httpOptions)
      .pipe(
        catchError(this.handleError('addAnnouncementInstitutionPosition', announcementInstitutionPosition))
      );
  }


  deleteAnnouncementInstitutionPosition(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteAnnouncementInstitutionPosition'))
      );
  }

 
  updateAnnouncementInstitutionPosition(id:number,AnnouncementInstitutionPosition: any): Observable<AnnouncementInstitutionPosition> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<AnnouncementInstitutionPosition>(url, AnnouncementInstitutionPosition, httpOptions)
      .pipe(
        catchError(this.handleError('updateAnnouncementInstitutionPosition', AnnouncementInstitutionPosition))
      );
  }
}
