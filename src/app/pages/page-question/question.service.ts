import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Question } from './question';
import { Observable, catchError } from 'rxjs';
import { Paginate } from 'src/app/tools/paginate/paginate';
import { PageEvent } from '@angular/material/paginator';
import { HandlePageEvent } from 'src/app/tools/paginate/handle-page-event';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = `${environment.apiURL}/question`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('QuestionService');
  }

 
  getQuestions(categoryId=null): Observable<Question[]> {

    const options = categoryId ?
    { params: new HttpParams().set('categoryId', categoryId) } : {};



    return this.http.get<Question[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError('getQuestions', []))
      );
  }


  getPaginateQuestions(e: HandlePageEvent): Observable<Paginate | null > {
    const options = e ?
    { params: new HttpParams().set('page', e.pageIndex).set('limit', e.pageSize) } : {};

    return this.http.get<Paginate>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError('getQuestions', null))
      );
  }


  getQuestion(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Question>(url)
      .pipe(
        catchError(this.handleError('getQuestion', null))
      );
  }


  searchQuestions(term: string): Observable<Question[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};
    return this.http.get<Question[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Question[]>('searchQuestions', []))
      );
  }


  addQuestion(question: any): Observable<any> {
    return this.http.post<Question>(this.apiUrl, question, httpOptions)
      .pipe(
        catchError(this.handleError('addQuestion', null))
      );
  }


  deleteQuestion(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteQuestion'))
      );
  }

 
  updateQuestion(id:number,question: any): Observable<Question> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Question>(url, question, httpOptions)
      .pipe(
        catchError(this.handleError('updateQuestion', question))
      );
  }


}
