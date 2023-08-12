import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { PositionType } from './position-type';
import { Observable, catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PositionTypeService {

  apiUrl = `${environment.apiURL}/position-type`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PositionTypeService');
  }

 
  getPositionTypes(): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getPositionTypes', []))
      );
  }


  getPositionType(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PositionType>(url)
      .pipe(
        catchError(this.handleError('getPositionType', null))
      );
  }


  addPositionType(positionType: any): Observable<PositionType> {
    return this.http.post<PositionType>(this.apiUrl, positionType, httpOptions)
      .pipe(
        catchError(this.handleError('addpositionType', positionType))
      );
  }


  deletePositionType(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/Announcements/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePositionType'))
      );
  }

 
  updatePositionType(id:number,positionType: any): Observable<PositionType> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<PositionType>(url, positionType, httpOptions)
      .pipe(
        catchError(this.handleError('updatePositionType', positionType))
      );
  }
}
