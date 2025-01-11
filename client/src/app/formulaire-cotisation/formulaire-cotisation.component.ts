import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-cotisation',
  templateUrl: './formulaire-cotisation.component.html',
  styleUrls: ['./formulaire-cotisation.component.scss']
})
export class FormulaireCotisationComponent implements OnInit {
  cotisationOption: string = ''; 
  montantDon: number = 0; 
  totalCotisation: number = 5;

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.cotisationOption = this.adherentDataService.getData('cotisationOption') || '';
    this.montantDon = this.adherentDataService.getData('montantDon') || 0;

    this.updateCotisation();
  }

  updateCotisation(): void {
    if (this.cotisationOption === 'cotisation') {
      this.totalCotisation = 5; 
    } else if (this.cotisationOption === 'cotisationDon') {
      this.totalCotisation = 5 + (this.montantDon > 0 ? this.montantDon : 0); 
    } else {
      this.totalCotisation = 0; 
    }
  }

  onNext(): void {
    if (this.cotisationOption === 'cotisationDon' && this.montantDon <= 0) {
      alert("Veuillez entrer un montant valide pour le don.");
      return;
    }

    this.adherentDataService.setData('cotisationOption', this.cotisationOption);
    this.adherentDataService.setData('montantDon', this.montantDon);
    this.adherentDataService.setData('totalCotisation', this.totalCotisation);

    console.log('Données sauvegardées :', {
      cotisationOption: this.cotisationOption,
      montantDon: this.montantDon,
      totalCotisation: this.totalCotisation,
    });

    this.router.navigate(['/app-formulaire-choix']);
  }
}
