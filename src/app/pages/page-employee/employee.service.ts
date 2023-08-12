import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Employee, EmployeeInstitution } from './employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = `${environment.apiURL}/employee`;
  apiEmployeeInstitutionUrl = `${environment.apiURL}/employee-institution`; 

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EmployeeService');
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

  addEmployeeInstitution(employee: any): Observable<EmployeeInstitution> {
    return this.http.post<Employee>(this.apiEmployeeInstitutionUrl, employee, httpOptions)
      .pipe(
        catchError(this.handleError('addEmployeeInstitution', employee))
      );
  }

  getEmployeeInstitutions(announcementId:number): Observable<EmployeeInstitution[]> {
    const url = `${this.apiEmployeeInstitutionUrl}/announcement/${announcementId}`;

    return this.http.get<EmployeeInstitution[]>(url)
      .pipe(
        catchError(this.handleError('getEmployeeInstitutions', []))
      );
  }

}
