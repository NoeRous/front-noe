import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { TestGroupQuestion } from './test-group-question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TestGroupQuestionService {

  apiUrl = `${environment.apiURL}/test-group-question`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TestGroupQuestionService');
  }

 
  getTestGroupQuestions(testGroupId:number): Observable<any> {
    const url = `${this.apiUrl}/test-group/${testGroupId}`;
    return this.http.get<TestGroupQuestion[]>(url)
      .pipe(
        catchError(this.handleError('getTestGroupQuestions', null))
      );
  }

  // deleteTestGroupQuestion(id: number,removeTestGroupQuestions:any): Observable<any> {
  //   const url = `${this.apiUrl}/removeAll`; 
  //   const options = id ?

  //    { params: new HttpParams().set('test_group_id', id) } : {params: new HttpParams().set('testGroupQuestions', removeTestGroupQuestions)};
     

  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteTestGroupQuestion'))
  //     );
  // }

  deleteTestGroupQuestion(id: number, removeTestGroupQuestions: any[]): Observable<any> {
    const url = `${this.apiUrl}/removeAll`;
    let params = new HttpParams();
  
    if (id) {
      params = params.append('test_group_id', id.toString());
    }
  
    const body = {
      testGroupQuestions: removeTestGroupQuestions
    };
  
    const options = { params: params };
  
    return this.http.post(url, body, options)
      .pipe(
        catchError(this.handleError('deleteTestGroupQuestion'))
      );
  }

  addTestGroupQuestion(id: number, addTestGroupQuestions: any[]): Observable<any> {
    const url = `${this.apiUrl}/addAll`;
    let params = new HttpParams();
  
    if (id) {
      params = params.append('test_group_id', id.toString());
    }
  
    const body = {
      testGroupQuestions: addTestGroupQuestions
    };
  
    const options = { params: params };
  
    return this.http.post(url, body, options)
      .pipe(
        catchError(this.handleError('addTestGroupQuestion'))
      );
  }
}
