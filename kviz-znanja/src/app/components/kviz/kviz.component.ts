import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kviz',
  templateUrl: './kviz.component.html',
  styles: []
})
export class KvizComponent implements OnInit {
  kvizovi: any[] = [];

  constructor(private restService: RestService,
              private swalService: SwalService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.restService.get("kviz", {})
      .subscribe(data => {
        this.kvizovi = data;
      });
  }

  dodaj(){
    this.router.navigate(['/add-kviz']);
  }

  brisi(id){
    this.restService.get("kviz/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja kviza!");
        }
        else{
          this.swalService.showSuccess("Success!", "Kviz uspješno obrisan!");
          this.kvizovi = this.kvizovi.filter(kv => kv.ID != id);
        }
      });
  }

  edit(k){
    localStorage.setItem("editKviz", JSON.stringify(k));
    this.router.navigate(['/edit-kviz']);
  }

  zapocniKviz(k){
    localStorage.setItem("selectedKvizForIgra", JSON.stringify(k));
    this.router.navigate(['/igra']);
  }

}
