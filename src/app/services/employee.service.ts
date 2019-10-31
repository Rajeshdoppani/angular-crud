import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { retry } from "rxjs/operators";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllEmployees() {
    const headers = new HttpHeaders({
      'access-token': JSON.parse(this.cookieService.get('authToken'))
    })
    return this.http.get<employeeConfig>(LoginService.API_Base_URl + '/employee', { headers: headers }).pipe(retry(1));
  }

  addEmployee(request: any) {
    return this.http.post<employeePostConfig>(LoginService.API_Base_URl + '/employee', request).pipe(retry(1));
  }

  updateEmployee(request: any, id: any) {
    return this.http.patch(LoginService.API_Base_URl + '/employee/' + id, request).pipe(retry(1));
  }

  deleteEmployee(request) {
    return this.http.delete(LoginService.API_Base_URl + '/employee/' + request).pipe(retry(1));
  }

}

export interface employeeConfig {
  id: any,
  name: string,
  age: number,
  designation: string
}

export interface employeePostConfig {
  name: string,
  age: number,
  designation: string
}
