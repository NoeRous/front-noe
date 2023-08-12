import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

import { environment } from 'src/environments/environment.development';
import { Position } from './position';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  apiUrl = `${environment.apiURL}/position`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Positionservice');
  }

 
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getPositions', []))
      );
  }


  getPosition(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Position>(url)
      .pipe(
        catchError(this.handleError('getPosition', null))
      );
  }


  searchPositions(term: string): Observable<Position[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Position[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Position[]>('searchPositions', []))
      );
  }


  addPosition(announcement: any): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('addPosition', announcement))
      );
  }


  deletePosition(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePosition'))
      );
  }

 
  updatePosition(id:number,announcement: any): Observable<Position> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Position>(url, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('updatePosition', announcement))
      );
  }
}
