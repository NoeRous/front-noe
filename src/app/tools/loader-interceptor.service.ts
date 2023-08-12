import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService  implements HttpInterceptor {

  constructor( private spinner: NgxSpinnerService) { }



  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showLoader();
      // we use finalize for covering all the cas
    return next.handle(req).pipe(finalize(() => this.onEnd()));
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.spinner.show();
  }
  private hideLoader(): void {
    this.spinner.hide();
  }



}
