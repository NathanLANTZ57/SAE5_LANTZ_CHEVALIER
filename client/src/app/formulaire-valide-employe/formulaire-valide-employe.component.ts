import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeDataService } from '../shared/employe-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulaire-valide-employe',
  templateUrl: './formulaire-valide-employe.component.html',
  styleUrls: ['./formulaire-valide-employe.component.scss']
})
export class FormulaireValideEmployeComponent implements OnInit {
  constructor(
    private employeDataService: EmployeDataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSave(): void {
    const employeData = this.employeDataService.getAllData();

    if (
      !employeData.nom ||
      !employeData.prenom ||
      !employeData.dateNaissance ||
      !employeData.email ||
      !employeData.adresse ||
      !employeData.ville ||
      !employeData.codePostal ||
      !employeData.formulePanier
    ) {
      alert('Certaines informations nécessaires sont manquantes.');
      return;
    }

    const payload = {
      nom: employeData.nom,
      prenom: employeData.prenom,
      date_naissance: employeData.dateNaissance,
      adresse_mail: employeData.email,
      adresse_postale: employeData.adresse,
      ville: employeData.ville,
      code_postal: employeData.codePostal,
      formule_panier: employeData.formulePanier,
      statut_paiement: 'en_attente'
    };

    this.http.post('http://localhost:3000/api/register/employesabonne', payload).subscribe(
      (response) => {
        console.log('Enregistrement réussi :', response);
        alert('Votre abonnement a été enregistré avec succès !');
        this.router.navigate(['/profil']); 
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement :', error);
        alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      }
    );
  }
}
