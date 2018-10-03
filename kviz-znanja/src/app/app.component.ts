import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';


import * as $ from "jquery";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit{

  constructor(private authService: AuthService,
              private router: Router) { }

  ngAfterViewInit() {
      $("#wrapper").toggleClass("toggled");
  }

  logout(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
