import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prikaz-rezultata',
  templateUrl: './prikaz-rezultata.component.html',
  styles: []
})
export class PrikazRezultataComponent implements OnInit {
  score: any = {};
  postotak: any = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.score = JSON.parse(localStorage.getItem("score"));
    this.postotak = Math.trunc((this.score.ostvarenihBodova / this.score.maxBodova) * 100);
  }

  novaIgra(){
    this.router.navigate(['/igra']);
  }

  rezultati(){
    this.router.navigate(['/rezultati']);
  }

}
