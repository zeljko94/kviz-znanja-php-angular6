import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-kviz',
  templateUrl: './edit-kviz.component.html',
  styles: []
})
export class EditKvizComponent implements OnInit {
  kviz: any;
  pitanja: any[];
  selectedPitanja: any[] = [];

  kvizDetails: any;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    this.kviz = JSON.parse(localStorage.getItem("editKviz"));

    this.restService.get("pitanje", {})
      .subscribe(data => {
        this.pitanja = data;
      });

      this.restService.get("kvizpitanje/forkviz/" + this.kviz.ID, {})
        .subscribe(data => {
          this.selectedPitanja = data;
        });
  }

  save(){
    if(this.kviz.Naziv){
      setTimeout(() => { 
        this.restService.get("kvizpitanje/deleteforkviz/" + this.kviz.ID, {})
          .subscribe(data => {
            if(data == 1){
              this.restService.post("kvizpitanje/insertforkviz", JSON.stringify({KvizID: this.kviz.ID, PitanjaIDList: this.getSelectedPitanja()}))
                .subscribe(data => {
                  if(data == -1){
                    this.swalService.showError("Greška!", "Greška prilikom spremanja izmjena!");
                  }
                  else{
                    this.swalService.showSuccess("Uspjeh!", "Izmjene uspješno spremljene!");
                  }
                });
            }
          });
      }, 300);
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
