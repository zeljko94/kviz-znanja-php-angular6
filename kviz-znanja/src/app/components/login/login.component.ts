import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "admin@gmail.com";
  password: string = "asd";

  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router:      Router) { }

  ngOnInit() {
  }


  login(){
    if(this.email){
      if(this.password){
        this.restService.post("user/login", JSON.stringify({Email: this.email, Password: this.password}))
          .subscribe(data => {
            if(data){
              this.authService.login(data);
              this.router.navigate(['/kvizovi']);
            }
            else{
              this.swalService.showError("Error!", "Greška prilikom logiranja!");
            }
          });
      }
    }
  }
}
