import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { RoleMenu } from './role-menu';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RoleMenuService {

  apiUrl = `${environment.apiURL}/role-menu`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RoleMenuService');
  }

 
  getRoleMenus(): Observable<RoleMenu[]> {
    return this.http.get<RoleMenu[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getRoleMenus', []))
      );
  }


  getRoleMenu(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RoleMenu>(url)
      .pipe(
        catchError(this.handleError('getRoleMenu', null))
      );
  }


  searchRoleMenus(term: string): Observable<RoleMenu[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<RoleMenu[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<RoleMenu[]>('searchRoleMenus', []))
      );
  }


  addRoleMenu(test: any): Observable<RoleMenu> {
    return this.http.post<RoleMenu>(this.apiUrl, test, httpOptions)
      .pipe(
        catchError(this.handleError('addRoleMenu', test))
      );
  }


  deleteRoleMenu(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteRoleMenu'))
      );
  }

 
  updateRoleMenu(id:number,test: any): Observable<RoleMenu> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<RoleMenu>(url, test, httpOptions)
      .pipe(
        catchError(this.handleError('updateRoleMenu', test))
      );
  }


}
