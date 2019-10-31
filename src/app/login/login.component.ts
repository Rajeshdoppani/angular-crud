import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder,private cookieService: CookieService) {

    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });

    this.cookieService.deleteAll();
  }

  login() {
    let request = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.loginService.loginAuthentication(request).subscribe(resp=>{
      this.cookieService.deleteAll();
      if(resp.status==true){
        this.cookieService.set('authToken',JSON.stringify(resp.token));
        this.cookieService.set('authName', JSON.stringify(resp.username));
        this.cookieService.set('authEmail', JSON.stringify(resp.email));
        this.router.navigate(['posts']);
      }
    })
  }
  ngOnInit() {
  }

}
