import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-add-kviz',
  templateUrl: './add-kviz.component.html',
  styles: []
})
export class AddKvizComponent implements OnInit {
  Naziv: string;
  pitanja: any[];

  constructor(private restService: RestService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    this.restService.get("pitanje", {})
      .subscribe(data => {
        this.pitanja = data;
      });
  }

  save(){
    if(this.Naziv){
      var KvizID = 0;
      this.restService.post("kviz/insert", JSON.stringify({Naziv: this.Naziv}))
        .subscribe(data => {
          if(data == -1){
              this.swalService.showError("Greška!", "Greška prilikom unosa kviza u bazu!");
          }
          else{
           KvizID = data.ID;
          setTimeout(() => { 
            this.restService.get("kvizpitanje/deleteforkviz/" + KvizID, {})
              .subscribe(data => {
                if(data == 1){
                  this.restService.post("kvizpitanje/insertforkviz", JSON.stringify({KvizID: KvizID, PitanjaIDList: this.getSelectedPitanja()}))
                    .subscribe(data => {
                      if(data == -1){
                        this.swalService.showError("Greška!", "Greška prilikom unosa kviza!");
                      }
                      else{
                        this.swalService.showSuccess("Uspjeh!", "Kviz uspješno spremljen!");
                      }
                    });
                }
              });
          }, 300);
          }
        });
    }
  }

  getSelectedPitanja(){
    var inputs = document.getElementsByName("selectedPitanjaChk");
    var ids = [];
    
      for(var i=0; i<inputs.length; i++){
        if((<HTMLInputElement>inputs[i]).type == "checkbox"){
          if((<HTMLInputElement>inputs[i]).checked == true){
            ids.push((<HTMLInputElement>inputs[i]).value);
          }
        }
      }
    return ids;
  }

}
