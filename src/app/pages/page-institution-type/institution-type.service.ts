import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

import { environment } from 'src/environments/environment.development';
import { InstitutionType } from './institution-type';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InstitutionTypeService {

  apiUrl = `${environment.apiURL}/institution-type`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('InstitutionTypeService');
  }

 
  getInstitutionTypes(): Observable<InstitutionType[]> {
    return this.http.get<InstitutionType[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getInstitutionTypes', []))
      );
  }


  getInstitutionType(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<InstitutionType>(url)
      .pipe(
        catchError(this.handleError('getInstitutionType', null))
      );
  }


  searchInstitutionTypes(term: string): Observable<InstitutionType[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<InstitutionType[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<InstitutionType[]>('searchInstitutionTypes', []))
      );
  }


  addInstitutionType(announcement: any): Observable<InstitutionType> {
    return this.http.post<InstitutionType>(this.apiUrl, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('addInstitutionType', announcement))
      );
  }


  deleteInstitutionType(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/InstitutionTypes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteInstitutionType'))
      );
  }

 
  updateInstitutionType(id:number,announcement: any): Observable<InstitutionType> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<InstitutionType>(url, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('updateInstitutionType', announcement))
      );
  }

}
