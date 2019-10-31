import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public static API_Base_URl = 'http://localhost:3000'

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loginAuthentication(request: any) {
    return this.http.post<LoginResponseConfig>(LoginService.API_Base_URl + '/user/login', request).pipe(retry(1));
  }
}

export interface LoginResponseConfig {
  message: string,
  status: any,
  token: any,
  email: string,
  username: string,
}
