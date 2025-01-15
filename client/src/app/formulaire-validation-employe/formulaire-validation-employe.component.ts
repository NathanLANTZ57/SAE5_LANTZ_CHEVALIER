import { Component, OnInit } from '@angular/core';
import { EmployeDataService } from '../shared/employe-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-validation-employe',
  templateUrl: './formulaire-validation-employe.component.html',
  styleUrls: ['./formulaire-validation-employe.component.scss']
})
export class FormulaireValidationEmployeComponent implements OnInit {
  formulePanier: string = '';

  constructor(
    private employeDataService: EmployeDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulePanier = this.employeDataService.getData('formulePanier') || '';
    console.log('Formule récupérée dans la validation :', this.formulePanier);
  }

  onBack(): void {
    window.history.back();
  }

  onNext(): void {
    if (!this.formulePanier) {
      alert('Aucune formule sélectionnée. Veuillez vérifier vos choix.');
      return;
    }

    console.log('Validation terminée avec la formule :', this.formulePanier);

    this.router.navigate(['/formulaire-valide-employe']);
  }
}
