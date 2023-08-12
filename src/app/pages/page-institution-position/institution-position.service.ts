import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { InstitutionPosition } from './institution-position';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InstitutionPositionService {

  

  apiUrl = `${environment.apiURL}/institution-position`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('InstitutionPositionservice');
  }

 
  getInstitutionPositions(): Observable<InstitutionPosition[]> {
    return this.http.get<InstitutionPosition[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getInstitutionPositions', []))
      );
  }


  getInstitutionPosition(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<InstitutionPosition>(url)
      .pipe(
        catchError(this.handleError('getInstitutionPosition', null))
      );
  }


  searchInstitutionPositions(term: string): Observable<InstitutionPosition[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<InstitutionPosition[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<InstitutionPosition[]>('searchInstitutionPositions', []))
      );
  }


  addInstitution(institutionPosition: any): Observable<InstitutionPosition> {
    return this.http.post<InstitutionPosition>(this.apiUrl, institutionPosition, httpOptions)
      .pipe(
        catchError(this.handleError('addInstitution', institutionPosition))
      );
  }


  deleteInstitution(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteInstitution'))
      );
  }

 
  updateInstitution(id:number,institutionPosition: any): Observable<InstitutionPosition> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<InstitutionPosition>(url, institutionPosition, httpOptions)
      .pipe(
        catchError(this.handleError('updateInstitution', institutionPosition))
      );
  }


}
