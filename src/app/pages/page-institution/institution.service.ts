import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

import { environment } from 'src/environments/environment.development';
import { Institution } from './institution';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  apiUrl = `${environment.apiURL}/institution`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Institutionservice');
  }

 
  getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getInstitutions', []))
      );
  }


  getInstitution(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Institution>(url)
      .pipe(
        catchError(this.handleError('getInstitution', null))
      );
  }


  searchInstitutions(term: string): Observable<Institution[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Institution[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Institution[]>('searchInstitutions', []))
      );
  }


  addInstitution(institution: any): Observable<Institution> {
    return this.http.post<Institution>(this.apiUrl, institution, httpOptions)
      .pipe(
        catchError(this.handleError('addInstitution', institution))
      );
  }


  deleteInstitution(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteInstitution'))
      );
  }

 
  updateInstitution(id:number,institution: any): Observable<Institution> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Institution>(url, institution, httpOptions)
      .pipe(
        catchError(this.handleError('updateInstitution', institution))
      );
  }
  

}
