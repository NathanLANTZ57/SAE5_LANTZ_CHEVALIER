import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulaire-choix',
  templateUrl: './formulaire-choix.component.html',
  styleUrls: ['./formulaire-choix.component.scss']
})
export class FormulaireChoixComponent  {

  numbers: number[] = [];

  constructor() {
    // Génération des nombres de 1 à 50
    this.numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  }

}
