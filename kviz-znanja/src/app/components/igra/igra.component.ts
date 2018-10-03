import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { RestService } from '../../services/rest.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-igra',
  templateUrl: './igra.component.html',
  styles: []
})
export class IgraComponent implements OnInit {
  kviz: any;
  pitanja: any = [];
  trenutnoPitanje?: any;
  turnNumber: number = 0;
  maxBodova: number;
  ostvarenihBodova: number = 0;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    this.kviz = JSON.parse(localStorage.getItem("selectedKvizForIgra"));

    this.restService.get("pitanje/GetPitanjaIOdgovoreForKviz/" + this.kviz.ID, {})
      .subscribe(data => {
        this.pitanja = data;
        this.trenutnoPitanje = this.pitanja[0];
        this.maxBodova = this.pitanja.length;
      });
  }

  odgovorClick(odgovor){
  if(this.turnNumber >= this.pitanja.length-1){
    var score = {
      ostvarenihBodova: this.ostvarenihBodova,
      maxBodova: this.maxBodova
    };
    localStorage.setItem("score", JSON.stringify(score));

    var d = new Date();
    this.restService.post("rezultat/insert", JSON.stringify({
      OstvarenihBodova: this.ostvarenihBodova,
      MaxBodova: this.maxBodova,
      Postotak:  Math.trunc((this.ostvarenihBodova / this.maxBodova) * 100),
      Datum: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
      UserID: JSON.parse(localStorage.getItem("user")).ID,
      KvizID: this.kviz.ID

    }))
      .subscribe(data => {});
    this.router.navigate(['/prikaz-rezultata']);
  }
  if(this.turnNumber < this.pitanja.length-1){
    if(odgovor.IsTocan == 1){
      this.ostvarenihBodova++;
    }
    this.turnNumber++;
    this.trenutnoPitanje = this.pitanja[this.turnNumber];
  }
}


}
