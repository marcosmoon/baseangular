import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { json } from 'stream/consumers';
import { ILoginRequest } from '../../interfaces/ILoginRequest';
import { IResponse } from '../../interfaces/IResponse';
import { ITokenResponse, IUserData } from '../../interfaces/ITokenResponse';


@Injectable({  providedIn: 'root'})

export class AuthService {

  private apiURL = environment.apiURL;

  private readonly TOKEN: string = "jwt";
  private readonly RTOKEN: string = "rjwt";

  private readonly USERDATA: string = "userData";

  private _UserLogged$ = new Subject<boolean>();
  private _RefreshedToken$ = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this._UserLogged$.next(false);
    this._RefreshedToken$.next(false);

  }



  // Login
  login(data: ILoginRequest) { return this.http.post<IResponse<ITokenResponse>>(`${this.apiURL}/authentication/login`, data) }

  logout() {
    this.http.put(`${this.apiURL}/authentication/logout-user`, null).subscribe(() => {
      this.logoutUnauthorized();
    }, (error) => {
      this.logoutUnauthorized();
    });
  }


  saveJwt(data: ITokenResponse) {
    sessionStorage.setItem(this.TOKEN, data.token);
    sessionStorage.setItem(this.RTOKEN, data.refreshToken);
  }

  setUserLogged(value: boolean) { this._UserLogged$.next(value); }

  setUserData(data: IUserData) { sessionStorage.setItem(this.USERDATA, JSON.stringify(data)) }

  getUserData(): IUserData { return JSON.parse(sessionStorage.getItem(this.USERDATA)); }

  getUserLogged() { return this._UserLogged$.asObservable(); }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.TOKEN);
    let user = sessionStorage.getItem(this.RTOKEN);
    return (token && user ? true : false);
  }

  getJwt() {
    var jwt = sessionStorage.getItem(this.TOKEN);
    return jwt ? jwt : '';
  }

  getRjwt(): string {
    var rjwt = sessionStorage.getItem(this.RTOKEN);
    return rjwt ? rjwt : '';
  }

  refreshToken() {
    var responseToken: ITokenResponse = { token: this.getJwt(), refreshToken: this.getRjwt(), userData: this.getUserData() };

    return this.http.post<IResponse<ITokenResponse>>(`${this.apiURL}/authentication/refreshToken`, responseToken)
      .pipe(tap((response: IResponse<ITokenResponse>) => {
        this.saveJwt(response.data);
      }));
  }

  setRefreshedToken(value: boolean) { this._RefreshedToken$.next(value); }

  getRefreshedToken() { return this._RefreshedToken$.asObservable(); }

  logoutUnauthorized() {
    this.setUserLogged(false);
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

}
