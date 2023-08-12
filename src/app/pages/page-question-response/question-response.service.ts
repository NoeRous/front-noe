import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { QuestionResponse } from './question-response';
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
export class QuestionResponseService {
  apiUrl = `${environment.apiURL}/question-response`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('QuestionResponseService');
  }

 
  getQuestionResponces(): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getQuestionResponces', []))
      );
  }


  getQuestionResponce(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<QuestionResponse>(url)
      .pipe(
        catchError(this.handleError('getQuestionResponce', null))
      );
  }


  addQuestionResponce(questionResponce: any): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(this.apiUrl, questionResponce, httpOptions)
      .pipe(
        catchError(this.handleError('addQuestionResponce', questionResponce))
      );
  }


  deleteQuestionResponce(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/Announcements/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteQuestionResponce'))
      );
  }

 
  updateQuestionResponce(id:number,questionResponce: any): Observable<QuestionResponse> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<QuestionResponse>(url, questionResponce, httpOptions)
      .pipe(
        catchError(this.handleError('updateQuestionResponce', questionResponce))
      );
  }
}
