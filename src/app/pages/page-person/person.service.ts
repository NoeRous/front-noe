import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

import { environment } from 'src/environments/environment.development';
import { Person } from './person';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  apiUrl = `${environment.apiURL}/person`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PersonsService');
  }

 
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getPersons', []))
      );
  }


  getPerson(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Person>(url)
      .pipe(
        catchError(this.handleError('getPerson', null))
      );
  }


  getPersonProfile(): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    return this.http.get<Person>(url)
      .pipe(
        catchError(this.handleError('getPerson', null))
      );
  }


  searchPersons(term: string): Observable<Person[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Person[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Person[]>('searchPersons', []))
      );
  }


  addPerson(person: any): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person, httpOptions)
      .pipe(
        catchError(this.handleError('addPerson', person))
      );
  }


  deletePerson(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; // DELETE api/persons/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePerson'))
      );
  }

 
  updatePerson(id:number,person: any): Observable<Person> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Person>(url, person, httpOptions)
      .pipe(
        catchError(this.handleError('updatePerson', person))
      );
  }

  addPersonEmployee(person: any): Observable<any> {
    const url= `${this.apiUrl}/employee`;
    return this.http.post<any>(url, person, httpOptions)
      .pipe(
        catchError(this.handleError('addPersonEmployee', person))
      );
  }
}
