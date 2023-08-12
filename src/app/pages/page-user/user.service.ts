import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { User } from './user';
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
export class UserService {
  userUrl = `${environment.apiURL}/user`;

  userRoleUrl = `${environment.apiURL}/user-role`;

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        catchError(this.handleError('getAnnouncements', []))
      );
  }


  updateUserRole(id:number,userRole: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.userRoleUrl}/${id}`;
    return this.http.patch<any>(url, userRole, httpOptions)
      .pipe(
        catchError(this.handleError('updateUserRole', userRole))
      );
  }

  updateUserPassword(id:number,user: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.userUrl}/${id}`;
    return this.http.patch<any>(url, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUserRole', user))
      );
  }

}
