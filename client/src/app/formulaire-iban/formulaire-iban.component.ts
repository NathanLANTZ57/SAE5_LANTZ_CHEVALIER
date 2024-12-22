import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-iban',
  templateUrl: './formulaire-iban.component.html',
  styleUrls: ['./formulaire-iban.component.scss']
})
export class FormulaireIbanComponent {
  ibanForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private adherentDataService: AdherentDataService,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialiser le formulaire avec des validations
    this.ibanForm = this.fb.group({
      iban: [
        this.adherentDataService.getData('iban') || '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/),
          Validators.maxLength(34)
        ]
      ],
      bic: [
        this.adherentDataService.getData('bic') || '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/),
          Validators.minLength(8),
          Validators.maxLength(11)
        ]
      ]
    });
  }

  get iban() {
    return this.ibanForm.get('iban');
  }

  get bic() {
    return this.ibanForm.get('bic');
  }

  // Convertir en majuscules les champs saisis
  onInputUppercase(field: string): void {
    const control = this.ibanForm.get(field);
    if (control) {
      control.setValue(control.value.toUpperCase(), { emitEvent: false });
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    this.submitted = true;

    if (this.ibanForm.valid) {
      // Sauvegarder les données IBAN et BIC dans le service
      this.adherentDataService.setData('iban', this.iban?.value);
      this.adherentDataService.setData('bic', this.bic?.value);

      // Récupérer toutes les données stockées dans le service
      const adherentData = this.adherentDataService.getAllData();

      // Mapper les champs pour correspondre aux attentes du backend
      const payload = {
        nom: adherentData.nom,
        prenom: adherentData.prenom,
        date_naissance: adherentData.dateNaissance,
        adresse_mail: adherentData.email,
        adresse_postale: adherentData.adresse,
        ville: adherentData.ville,
        code_postal: adherentData.codePostal,
        cotisation: adherentData.totalCotisation, // Total de la cotisation calculé dans la page cotisation
        don: adherentData.montantDon || 0,
        formule_panier_legumes_bio: adherentData.panierLegumes || false, // Formule légumes bio sélectionnée
        nb_panier_legumes_bio: adherentData.nbPanierLegumes || 0,
        formule_panier_fruits_bio: adherentData.panierFruits || false,
        nb_panier_fruits_bio: adherentData.nbPanierFruits || 0,
        formule_boite_oeufs_bio: adherentData.boiteOeuf || false,
        nb_panier_oeufs_bio: adherentData.nbBoiteOeuf || 0,
        depot: adherentData.depot || false,
        domicile: adherentData.domicile || false,
        formule_payement: adherentData.paiementOption,
        iban: adherentData.iban,
        bic: adherentData.bic,
      };

      console.log('Payload envoyé à l\'API :', payload);

      // Appeler l'API pour enregistrer l'adhérent
      this.http.post('http://localhost:3000/api/register/adherentsabonne', payload).subscribe({
        next: (response) => {
          console.log('Adhérent enregistré avec succès :', response);
          alert('Votre inscription a été enregistrée avec succès.');
          // Réinitialiser le service après succès
          this.adherentDataService.resetData();
          // Naviguer vers une page de confirmation ou l'accueil
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement :', error);
          alert(`Erreur lors de l'enregistrement : ${error.error?.message || error.message || 'Erreur inconnue.'}`);
        }
      });
    } else {
      console.error('Le formulaire contient des erreurs.');
      alert('Le formulaire contient des erreurs. Veuillez corriger les champs en rouge.');
    }
  }

  // Méthode pour naviguer à la page précédente
  onBack(): void {
    this.router.navigate(['/app-formulaire-mode-paiement']);
  }
}
