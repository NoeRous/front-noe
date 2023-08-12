import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

import { environment } from 'src/environments/environment.development';
import { Menu } from './menu';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
  apiUrl = `${environment.apiURL}/menu`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Menuservice');
  }

 
  getMenus(roleId:number): Observable<Menu[]> {
    const options = roleId ?
    { params: new HttpParams().set('roleId', roleId) } : {};
    return this.http.get<Menu[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError('getMenus', []))
      );
  }

  getRolesMenus(): Observable<any[]> {
    const url = `${this.apiUrl}/all/menu`;
    return this.http.get<Menu[]>(url, )
      .pipe(
        catchError(this.handleError('getRolesMenus', []))
      );
  }

  getSubMenus(menuId:number, roleId:number): Observable<Menu[]> {
    const options = menuId ?
    { params: new HttpParams().set('menuId', menuId).set('roleId', roleId) } : {};
    return this.http.get<Menu[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError('getSubMenus', []))
      );
  }


  getMenu(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Menu>(url)
      .pipe(
        catchError(this.handleError('getMenu', null))
      );
  }


  searchMenus(term: string): Observable<Menu[]> {
    term = term.trim();
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Menu[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<Menu[]>('searchMenus', []))
      );
  }


  addMenu(announcement: any): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('addMenu', announcement))
      );
  }


  deleteMenu(id: number): Observable<unknown> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteMenu'))
      );
  }

 
  updateMenu(id:number,announcement: any): Observable<Menu> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Menu>(url, announcement, httpOptions)
      .pipe(
        catchError(this.handleError('updateMenu', announcement))
      );
  }

}
