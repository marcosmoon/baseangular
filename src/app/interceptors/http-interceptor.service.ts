import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';

import { throwError, BehaviorSubject } from 'rxjs';
import { ITokenResponse } from 'src/app/interfaces/ITokenResponse';
import { IResponse } from 'src/app/interfaces/IResponse';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    let logguedIn = this.authService.isLoggedIn();

    if (logguedIn) {
      let jwt = this.authService.getJwt();
      req = this.addHeader(req, jwt);

      return next.handle(req).pipe(catchError(error => {
        // console.error(error);
        if (error.name === "HttpErrorResponse" && (error.status === 0 || error.status === 401)) {
          console.warn("this.handle401Error");
          return this.handle401Error(req, next);
        }
        else if (["INVALID_TOKEN", "RF_NOT_EXISTS", "RF_EXPIRED", "RF_INVALIDATED", "RF_USED", "RF_NOT_EQUAL_TO_JWT"].includes(error.error.message)) {
          console.warn("********************************** (RF_EXPIRED)");
          console.warn(error.error.message);
          console.warn("**********************************");
          this.authService.logout();
        }

        return throwError(error);

      }));
    }
    else {
      return next.handle(req);
    }
  }


  
  private addHeader(req: import("@angular/common/http").HttpRequest<any>, jwt: string) {

    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwt}`
      }
    });
  }

  private handle401Error(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler) {
    // console.warn("this.isRefreshing");
    // console.warn(this.isRefreshing);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((requestToken: IResponse<ITokenResponse>) => {
          this.isRefreshing = false;
          this.authService.saveJwt(requestToken.data);
          this.authService.setRefreshedToken(true);
          console.info("*************************************");
          console.info("I'm back, authorized! :)");
          console.info("*************************************");
          return next.handle(this.addHeader(req, requestToken.data.token));
        }));

    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addHeader(req, jwt));
        }));
    }
  }
}
