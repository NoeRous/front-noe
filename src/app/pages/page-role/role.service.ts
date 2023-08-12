import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Role } from './role';
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
export class RoleService {

  apiUrl = `${environment.apiURL}/role`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Roleservice');
  }

 
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getRoles', []))
      );
  }


  getRole(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Role>(url)
      .pipe(
        catchError(this.handleError('getRole', null))
      );
  }


  searchRoles(term: string): Observable<Role[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Role[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Role[]>('searchRoles', []))
      );
  }


  addRole(announcement: any): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('addRole', announcement))
      );
  }


  deleteRole(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteRole'))
      );
  }

 
  updateRole(id:number,announcement: any): Observable<Role> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Role>(url, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('updateRole', announcement))
      );
  }
}
