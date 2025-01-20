import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legume-de-saison',
  templateUrl: './legume-de-saison.component.html',
  styleUrls: ['./legume-de-saison.component.scss']
})
export class LegumeDeSaisonComponent implements OnInit {
  legumes: { categorie: string; nom: string; quantite: number; }[];

  constructor() { }

  ngOnInit(): void {
  }

}
