import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  list: any[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/posts', title: 'Posts', icon: 'local_post_office', class: '', list: [] },
  { path: '/employees', title: 'Employees', icon: 'group', class: '', list: [] },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any;

  constructor(private cookieService: CookieService, private router: Router) { }

  logoutUser() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
