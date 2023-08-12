import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Announcement } from './announcement';
import { environment } from 'src/environments/environment.development';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {


  apiUrl = `${environment.apiURL}/announcement`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AnnouncementsService');
  }

 
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getAnnouncements', []))
      );
  }


  getAnnouncement(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Announcement>(url)
      .pipe(
        catchError(this.handleError('getAnnouncement', null))
      );
  }

  getAnnouncementCurrent(): Observable<any> {
    const url = `${this.apiUrl}/current`;
    return this.http.get<Announcement>(url)
      .pipe(
        catchError(this.handleError('getAnnouncementCurrent', null))
      );
  }

  searchAnnouncements(term: string): Observable<Announcement[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Announcement[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Announcement[]>('searchAnnouncements', []))
      );
  }


  addAnnouncement(announcement: any): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('addAnnouncement', announcement))
      );
  }


  deleteAnnouncement(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/Announcements/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteAnnouncement'))
      );
  }

 
  updateAnnouncement(id:number,announcement: any): Observable<Announcement> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Announcement>(url, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('updateAnnouncement', announcement))
      );
  }

}
