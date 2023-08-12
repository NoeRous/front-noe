import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { TestGroup } from './test-group';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TestGroupService {

  apiUrl = `${environment.apiURL}/test-group`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TestGroupService');
  }

 
  getTestGroups(): Observable<TestGroup[]> {
    return this.http.get<TestGroup[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getTestGroups', []))
      );
  }


  getTestGroupsByTest(id:number): Observable<any> {
    const url = `${this.apiUrl}/test/${id}`;
    return this.http.get<TestGroup>(url)
      .pipe(
        catchError(this.handleError('getTestGroupsByTest', null))
      );
  }


  getTestGroup(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TestGroup>(url)
      .pipe(
        catchError(this.handleError('getTestGroup', null))
      );
  }


  searchTestGroups(term: string): Observable<TestGroup[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<TestGroup[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<TestGroup[]>('searchTestGroups', []))
      );
  }


  addTestGroup(test: any): Observable<TestGroup> {
    return this.http.post<TestGroup>(this.apiUrl, test, httpOptions)
      .pipe(
        catchError(this.handleError('addTest', test))
      );
  }


  deleteTestGroup(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteTestGroup'))
      );
  }

 
  updateTestGroup(id:number,test: any): Observable<TestGroup> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<TestGroup>(url, test, httpOptions)
      .pipe(
        catchError(this.handleError('updateTestGroup', test))
      );
  }
}
