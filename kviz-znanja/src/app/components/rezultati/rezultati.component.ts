import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rezultati',
  templateUrl: './rezultati.component.html',
  styles: []
})
export class RezultatiComponent implements OnInit {
  rezultatiStore: any[] = [];
  rezultati: any[] = [];
  chkMoji: boolean;
  searchTxt: string;
  LoggedUserID: any;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.restService.get("rezultat", {})
      .subscribe(data => {
        this.rezultatiStore = data;
        this.rezultati = this.rezultatiStore;
      });

      this.LoggedUserID = JSON.parse(localStorage.getItem("user")).ID;
  }

  applyFilter(){
    this.rezultati = this.rezultatiStore;

    if(this.searchTxt){
      this.rezultati = this.rezultati.filter(r => r.NazivKviza.toLowerCase().includes(this.searchTxt.toLowerCase()));
    }
    if(this.chkMoji){
      this.rezultati = this.rezultati.filter(r => r.UserID == this.LoggedUserID);
    }
  }

  brisi(id){
    this.restService.get("rezultat/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja rezultata!");
        }
        else{
          this.swalService.showSuccess("Uspjeh!", "Rezultat uspješno obrisan!");
          this.rezultatiStore = this.rezultatiStore.filter(r => r.ID != id);
          this.rezultati = this.rezultati.filter(r => r.ID != id);
        }
      });
  }

}
