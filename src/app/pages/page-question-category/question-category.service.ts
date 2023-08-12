import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { QuestionCategory } from './question-category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryService {

  apiUrl = `${environment.apiURL}/question-category`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('QuestionCategoryService');
  }

 
  getQuestionCategories(): Observable<QuestionCategory[]> {
    return this.http.get<QuestionCategory[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getQuestionCategorys', []))
      );
  }


  getQuestionCategory(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<QuestionCategory>(url)
      .pipe(
        catchError(this.handleError('getQuestionCategory', null))
      );
  }


  addQuestionCategory(QuestionCategory: any): Observable<QuestionCategory> {
    return this.http.post<QuestionCategory>(this.apiUrl, QuestionCategory, httpOptions)
      .pipe(
        catchError(this.handleError('addQuestionCategory', QuestionCategory))
      );
  }


  deleteQuestionCategory(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/Announcements/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteQuestionCategory'))
      );
  }

 
  updateQuestionCategory(id:number,QuestionCategory: any): Observable<QuestionCategory> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<QuestionCategory>(url, QuestionCategory, httpOptions)
      .pipe(
        catchError(this.handleError('updateQuestionCategory', QuestionCategory))
      );
  }
}
