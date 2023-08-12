import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PostulationTestService {

  apiPostulationTestUrl = `${environment.apiURL}/test/postulation`; 
  apiPostulationResponseUrl = `${environment.apiURL}/postulation-response`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PostulationTestService');
  }


  getPostulationTest(id:number): Observable<any> {
    const url = `${this.apiPostulationTestUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPostulationTest', []))
      );
  }

  addPostulationResponses(postulationResponses: any): Observable<any> {
    return this.http.post<any>(this.apiPostulationResponseUrl, postulationResponses, httpOptions)
      .pipe(
        catchError(this.handleError('addPostulationResponses', postulationResponses))
      );
  }
}
