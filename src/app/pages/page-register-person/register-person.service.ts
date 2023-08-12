import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Gender} from './gender';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterPersonService {

 
  apiUrl  = `${environment.apiURL}/person`;  // URL to web api
  apiGenderUrl  = `${environment.apiURL}/gender`;  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }



  /** POST: add a new hero to the database */
  addPerson(person: any): Observable<any> {
    const url= `${this.apiUrl}/applicant`;
    return this.http.post<any>(url, person, httpOptions)
      .pipe(
        catchError(this.handleError('addPerson', person))
      );
  }

  getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.apiGenderUrl)
      .pipe(
        catchError(this.handleError('getGenders', []))
      );
  }
}
