import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

export interface PostsConfig {
  id: any,
  title: string,
  description: string,
  message: string
}
export interface createPostsConfig {
  title: string,
  description: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllPosts() {
    const headers = new HttpHeaders({
      'access-token': JSON.parse(this.cookieService.get('authToken'))
    });
    return this.http.get<PostsConfig>(LoginService.API_Base_URl + '/posts', { headers: headers }).pipe(retry(1));
  }

  createPost(request: any) {
    return this.http.post<createPostsConfig>(LoginService.API_Base_URl + '/posts', request).pipe(retry(1));
  }

  updatePost(request: any, id: any) {
    return this.http.patch(LoginService.API_Base_URl + '/posts/' + id, request).pipe(retry(1));
  }

  deletePost(request: any) {
    return this.http.delete(LoginService.API_Base_URl + '/posts/' + request).pipe(retry(1));
  }
}
