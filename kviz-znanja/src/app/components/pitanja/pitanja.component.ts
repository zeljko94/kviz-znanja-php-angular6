import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pitanja',
  templateUrl: './pitanja.component.html',
  styles: []
})
export class PitanjaComponent implements OnInit {
  pitanja: any[] = [];

  constructor(private restService: RestService,
              private swalService: SwalService,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit() {
    this.restService.get("pitanje", {})
      .subscribe(data => {
        this.pitanja = data;
      });
  }

  dodaj(){
    this.router.navigate(['/add-pitanje']);
  }

  edit(id){

  }

  brisi(id){
    this.restService.get("pitanje/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja pitanja!");
        }
        else{
          this.swalService.showSuccess("Success!", "Pitanje uspješno obrisano!");
          this.pitanja = this.pitanja.filter(kv => kv.ID != id);
        }
      });
  }

}
