import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pitanje',
  templateUrl: './add-pitanje.component.html',
  styles: []
})
export class AddPitanjeComponent implements OnInit {
  Pitanje: string;
  Odg1: string;
  Odg2: string;
  Odg3: string;
  Odg4: string;
  TocanOdg: string;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
  }

  save(){
    if(this.Pitanje){
      if(this.Odg1){
        if(this.Odg2){
          if(this.Odg3){
            if(this.Odg4){
              if(this.TocanOdg){

                
                this.restService.post("pitanje/insert", JSON.stringify({Text: this.Pitanje}))
                  .subscribe(data => {
                    if(data != -1){
                      // dokuči ID unesenog pitanja, da bi mogli povezati odgovore sa pitanjem, (odgovor ima strani ključ PitanjeID - koje označava kojem pitanju pripada)
                      var pitanjeID = data;
                      this.restService.post("odgovor/insert", JSON.stringify({Text: this.Odg1, PitanjeID: pitanjeID, IsTocan: this.TocanOdg == "1" ? true : false}))
                        .subscribe(data => {
                          if(data == 1){
                            this.restService.post("odgovor/insert", JSON.stringify({Text: this.Odg2, PitanjeID: pitanjeID, IsTocan: this.TocanOdg == "2" ? true : false}))
                            .subscribe(data => {
                              if(data == 1){
                                this.restService.post("odgovor/insert", JSON.stringify({Text: this.Odg3, PitanjeID: pitanjeID, IsTocan: this.TocanOdg == "3" ? true : false}))
                                .subscribe(data => {
                                  if(data == 1){
                                    this.restService.post("odgovor/insert", JSON.stringify({Text: this.Odg4, PitanjeID: pitanjeID, IsTocan: this.TocanOdg == "4" ? true : false}))
                                    .subscribe(data => {
                                      if(data == 1){
                                        this.swalService.showSuccess("Uspjeh!", "Pitanje uspješno spremljeno u bazu!");
                                        this.router.navigate(['/pitanje']);
                                      }
                                      else{
                                        this.swalService.showError("Greška!", "Greška prilikom spremanja pitanja!");
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                    }
                  });
              }
              else{
                this.swalService.showError("Greška!", "Odaberite točan odgovor!");
              }
            }
          }
        }
      }
    }
  }
}
