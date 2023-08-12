import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Test } from './test';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TestService {

  apiUrl = `${environment.apiURL}/test`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TestService');
  }

 
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getTests', []))
      );
  }


  getTest(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Test>(url)
      .pipe(
        catchError(this.handleError('getTest', null))
      );
  }


  searchTests(term: string): Observable<Test[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Test[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Test[]>('searchTests', []))
      );
  }


  addTest(test: any): Observable<Test> {
    return this.http.post<Test>(this.apiUrl, test, httpOptions)
      .pipe(
        catchError(this.handleError('addTest', test))
      );
  }


  deleteTest(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteTest'))
      );
  }

 
  updateTest(id:number,test: any): Observable<Test> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Test>(url, test, httpOptions)
      .pipe(
        catchError(this.handleError('updateTest', test))
      );
  }
}
