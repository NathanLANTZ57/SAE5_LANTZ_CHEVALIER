import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeDataService } from '../shared/employe-data.service';

@Component({
  selector: 'app-formulaire-choix-panier-employe',
  templateUrl: './formulaire-choix-panier-employe.component.html',
  styleUrls: ['./formulaire-choix-panier-employe.component.scss']
})
export class FormulaireChoixPanierEmployeComponent implements OnInit {
  formulePanier: string = ''; // Contient le choix sélectionné

  constructor(
    private employeDataService: EmployeDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération des données sauvegardées lors du chargement du composant
    this.formulePanier = this.employeDataService.getData('formulePanier') || '';
    console.log('Formule récupérée au chargement :', this.formulePanier);
  }

  onNext(): void {
    if (!this.formulePanier) {
      alert('Veuillez sélectionner une formule de panier.');
      return;
    }

    // Sauvegarde de la donnée dans le service EmployeDataService
    this.employeDataService.setData('formulePanier', this.formulePanier);
    console.log('Formule sauvegardée :', this.formulePanier);

    // Navigation vers la page suivante
    this.router.navigate(['/formulaire-validation-employe']);
  }
}
