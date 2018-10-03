import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {
  user: any = {};

  constructor(private restService: RestService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    this.user.Privilegije = "admin";
  }

  spremi(){
    if(this.user.Ime){
      if(this.user.Prezime){
        if(this.user.Email){
          if(this.user.Password){
            if(this.user.Privilegije){

              this.restService.post("user/insert", JSON.stringify(this.user))
                .subscribe(data => {
                  if(data == -1){
                    this.swalService.showError("Greška!", "Greška prilikom dodavanja korisnika!");
                  }
                  else{
                    this.swalService.showSuccess("Uspjeh!", "Korisnik uspješno dodan!");
                    this.router.navigate(['/users']);
                  }
                });
            }
          }
        }
      }
    }
  }

}
