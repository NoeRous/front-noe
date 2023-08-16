import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { environment } from 'src/environments/environment.development';
import { Commission, CommissionExternal, CommissionInternal } from './commission';
import { Observable, catchError } from 'rxjs';
import { Institution } from '../page-institution/institution';
import { Position } from '../page-position/position';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  apiUrl = `${environment.apiURL}/commission`; 
  apiCommissionExternalUrl = `${environment.apiURL}/commission-external`;
  apiCommissionAssignedUrl = `${environment.apiURL}/commission-assigned`; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CommissionService');
  }

 
  getCommissionPerson(): Observable<CommissionInternal[]> {
    const url = `${this.apiUrl}/person`;
    return this.http.get<CommissionInternal[]>(url)
      .pipe(
        catchError(this.handleError('getCommissionPerson', []))
      );
  }

  getCommission(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Commission>(url)
      .pipe(
        catchError(this.handleError('getCommission', null))
      );
  }

  getCommissionAssigneds(id:number): Observable<any> {
    const url = `${this.apiUrl}/assigned/${id}`;
    return this.http.get<Commission>(url)
      .pipe(
        catchError(this.handleError('getCommissionAssigneds', null))
      );
  }

  addCommissionExternal(commissionExternal: any): Observable<any> {
    
    // const url= `${this.apiCommissionExternalUrl}/representative`;
    return this.http.post<any>(this.apiCommissionExternalUrl, commissionExternal, httpOptions)
      .pipe(
        catchError(this.handleError('addRepresentativeCommission', commissionExternal))
      );
  }

  getCommissionExternal(id:number): Observable<any> {
    const url = `${this.apiCommissionExternalUrl}/${id}`;
    return this.http.get<CommissionExternal>(url)
      .pipe(
        catchError(this.handleError('getCommissionExternal', null))
      );
  }

  updateCommissionExternal(id:number,commissionExternal: any): Observable<CommissionExternal> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiCommissionExternalUrl}/${id}`;
    return this.http.patch<CommissionExternal>(url, commissionExternal, httpOptions)
      .pipe(
        catchError(this.handleError('updateCommissionExternal', commissionExternal))
      );
  }

  deleteCommissionExternal(id: number): Observable<unknown> {
    const url = `${this.apiCommissionExternalUrl}/${id}`; // DELETE api/Announcements/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCommissionExternal'))
      );
  }

  getCommissionAssigned(id:number): Observable<any> {
    const url = `${this.apiCommissionAssignedUrl}/${id}`;
    return this.http.get<Commission>(url)
      .pipe(
        catchError(this.handleError('getCommissionAssigned', null))
      );
  }

  updateCommissionAssigned(id:number,commissionAssigned: any): Observable<CommissionExternal> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
      const url = `${this.apiCommissionAssignedUrl}/${id}`;
    return this.http.patch<CommissionExternal>(url, commissionAssigned, httpOptions)
      .pipe(
        catchError(this.handleError('updateCommissionAssigned', commissionAssigned))
      );
  }

  getCommissionAssignedInstitutions(announcementId:number): Observable<Institution[]> {
    const url = `${this.apiCommissionAssignedUrl}/institutions/${announcementId}`;

    return this.http.get<Institution[]>(url)
      .pipe(
        catchError(this.handleError('getCommissionAssignedInstitutions', []))
      );
  }

  getCommissionAssignedPositions(announcementId:number, institutionId:number): Observable<Position[]> {
    const url = `${this.apiCommissionAssignedUrl}/institutions/${announcementId}/${institutionId}`;

    return this.http.get<Position[]>(url)
      .pipe(
        catchError(this.handleError('getCommissionAssignedPositions', []))
      );
  }

}
