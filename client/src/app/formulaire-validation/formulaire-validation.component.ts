import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-validation',
  templateUrl: './formulaire-validation.component.html',
  styleUrls: ['./formulaire-validation.component.scss']
})
export class FormulaireValidationComponent implements OnInit {
  adherentData: any;

  constructor(
    private adherentDataService: AdherentDataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adherentData = this.adherentDataService.getAllData();
    if (!this.adherentData || Object.keys(this.adherentData).length === 0) {
      alert('Aucune donnée disponible. Veuillez remplir le formulaire.');
      this.router.navigate(['/formulaire-iban']);
    }
  }

  onConfirm(): void {
    const payload = {
      nom: this.adherentData.nom,
      prenom: this.adherentData.prenom,
      date_naissance: this.adherentData.dateNaissance,
      adresse_mail: this.adherentData.email,
      adresse_postale: this.adherentData.adresse,
      ville: this.adherentData.ville,
      code_postal: this.adherentData.codePostal,
      cotisation: this.adherentData.totalCotisation,
      don: this.adherentData.montantDon || 0,
      formule_panier_legumes_bio: this.adherentData.panierLegumes || false,
      nb_panier_legumes_bio: this.adherentData.nbPanierLegumes || 0,
      formule_panier_fruits_bio: this.adherentData.panierFruits || false,
      nb_panier_fruits_bio: this.adherentData.nbPanierFruits || 0,
      formule_boite_oeufs_bio: this.adherentData.boiteOeuf || false,
      nb_panier_oeufs_bio: this.adherentData.nbBoiteOeuf || 0,
      depot: this.adherentData.depot || false,
      domicile: this.adherentData.domicile || false,
      formule_payement: this.adherentData.paiementOption,
      iban: this.adherentData.iban,
      bic: this.adherentData.bic,
    };

    this.http.post('http://localhost:3000/api/register/adherentsabonne', payload).subscribe({
      next: (response) => {
        console.log('Adhérent enregistré avec succès :', response);
        alert('Votre inscription a été enregistrée avec succès.');
        this.adherentDataService.resetData();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement :', error);
        alert(`Erreur lors de l'enregistrement : ${error.error?.message || error.message || 'Erreur inconnue.'}`);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/formulaire-iban']);
  }
}
