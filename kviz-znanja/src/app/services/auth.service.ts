import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  user: any;

  constructor(private rotuer: Router) {
    this.isLoggedIn = localStorage.getItem("user") ? true : false;
   }

  isAdmin(){
    if(this.user){
      if(this.user.Privilegije == 'admin')
        return true;
      else
        return false;
    }
    return false;
  }

  isKorisnik(){
    if(this.user){
      if(this.user.Privilegije == 'korisnik')
        return true;
      else
        return false;
    }
    return false;
  }

  login(user: any){
    localStorage.setItem("user", JSON.stringify(user));
    this.isLoggedIn = true;
    this.user = user;
  }

  signOut(){
    localStorage.setItem("user", null);
    this.rotuer.navigate(['/login']);
    this.isLoggedIn = false;
    this.user = null;
  }
}
