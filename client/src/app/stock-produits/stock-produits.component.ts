import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-produits',
  templateUrl: './stock-produits.component.html',
  styleUrls: ['./stock-produits.component.scss']
})
export class StockProduitsComponent {
  legumes = [
    { categorie: 'Choux', nom: 'Chou blanc', quantite: '10' },
    { categorie: 'Racines', nom: 'Carottes', quantite: '20' },
  ];

  fruits = [
    { categorie: 'Agrumes', nom: 'Orange', quantite: '15' },
    { categorie: 'Baies', nom: 'Fraise', quantite: '25' },
  ];

  isModalOpen = false;
  newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; // Par défaut, type = légume

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; // Réinitialisation
  }

  addProduit() {
    if (this.newProduit.type === 'fruit') {
      this.fruits.push({ ...this.newProduit });
    } else {
      this.legumes.push({ ...this.newProduit });
    }
    this.closeModal();
  }
}
