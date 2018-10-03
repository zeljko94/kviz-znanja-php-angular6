import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  usersStore: any[] = [];
  users: any[] = [];
  searchTxt: string;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.restService.get("user", {})
      .subscribe(data => {
        this.users = data;
        this.usersStore = data;
      });
  }

  applyFilter(){
    this.users = this.usersStore;
    if(this.searchTxt){
      this.users = this.users.filter(u => u.Ime.toLowerCase().includes(this.searchTxt.toLowerCase()));
    }
  }

  brisi(id){
    this.restService.get("user/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja korisnika!");
        }
        else{
          this.swalService.showSuccess("Uspjeh!", "Korisnik uspješno obrisan!");
          this.users = this.users.filter(u => u.ID != id);
        }
      });
  }

  dodaj(){
    this.router.navigate(['/add-user']);
  }
}
