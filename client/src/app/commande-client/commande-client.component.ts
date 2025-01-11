import { Component } from '@angular/core';

@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.scss']
})
export class CommandeClientComponent {
  commandesAVenir = [
    {
      jour: 'Mardi',
      client: 'Jean Dupont',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      date: '2023-12-19'
    },
    {
      jour: 'Mercredi',
      client: 'Marie Curie',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      date: '2023-12-20'
    },
    {
      jour: 'Jeudi',
      client: 'Albert Einstein',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      date: '2023-12-21'
    },
    {
      jour: 'Vendredi',
      client: 'Isaac Newton',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      date: '2023-12-22'
    }
  ];

  commandesReprogrammees = [
    {
      jour: 'Vendredi',
      client: 'Marie Curie',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      nouvelleDate: '2023-12-25'
    },
    {
      jour: 'Lundi',
      client: 'Albert Einstein',
      produit: 'Panier Gourmand',
      type_abon: 'Panier Mensuel',
      nouvelleDate: '2023-12-26'
    }
  ];

  commandesAutres = [
    {
      jour: 'Vendredi',
      client: 'Marie Curie',
      lieu: 'Saint-Nabord',
      produit: 'Panier Simple',
      type_abon: 'Panier Hebdomadaire',
      nouvelleDate: '2023-12-25'
    },
    {
      jour: 'Samedi',
      client: 'Jean Dupont',
      lieu: 'Épinal',
      produit: 'Panier Bio',
      type_abon: 'Panier Mensuel',
      nouvelleDate: '2023-12-26'
    }
  ];

  isModalOpen: boolean = false;

  newCommande = {
    jour: '',
    client: '',
    societe:'',
    lieu: '',
    produit: '',
    type_abon: '',
    date: '',
    nouvelleDate: ''
  };
  

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetCommande();
  }

  resetCommande(): void {
    this.newCommande = {
      jour: '',
      client: '',
      societe:'',
      lieu: '',
      produit: '',
      type_abon: '',
      date: '',
      nouvelleDate: ''
    };
  }

  addCommande(): void {
    if (this.newCommande.client && this.newCommande.produit) {
      this.newCommande.nouvelleDate = this.newCommande.date;
  
      if (!this.newCommande.jour) {
        const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const dateObj = new Date(this.newCommande.date);
        this.newCommande.jour = jours[dateObj.getDay() - 1]; 
      }
        this.commandesAutres.push({ ...this.newCommande });
  
      this.closeModal();
    }
  }
  
}
