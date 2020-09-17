import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // const username = 'shwesin';
    // const password = 'shwesin';
    // const basicAuthHeaderString = 'Basic' + window.btoa(username + ':' + password);
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    if (basicAuthHeaderString && username) {
    request = request.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    });
  }
    return next.handle(request);
  }
}
