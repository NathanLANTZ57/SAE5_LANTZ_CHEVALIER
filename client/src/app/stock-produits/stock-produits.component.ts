import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stock-produits',
  templateUrl: './stock-produits.component.html',
  styleUrls: ['./stock-produits.component.scss']
})
export class StockProduitsComponent implements OnInit {
  legumes: any[] = [];
  fruits: any[] = [];
  isModalOpen = false;
  newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; // Par défaut, type = légume

  private apiUrl = 'http://localhost:3000/api'; // URL de base du backend

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLegumes();
    this.fetchFruits();
  }

  // Récupérer les légumes depuis le backend
  fetchLegumes(): void {
    this.http.get<any[]>(`${this.apiUrl}/legumes/afficher`).subscribe(
      (data) => {
        this.legumes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des légumes :', error);
      }
    );
  }

  // Récupérer les fruits depuis le backend
  fetchFruits(): void {
    this.http.get<any[]>(`${this.apiUrl}/fruits/afficher`).subscribe(
      (data) => {
        this.fruits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des fruits :', error);
      }
    );
  }

  // Ouvrir la modal pour ajouter un produit
  openModal(): void {
    this.isModalOpen = true;
  }

  // Fermer la modal
  closeModal(): void {
    this.isModalOpen = false;
    this.newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; // Réinitialisation
  }

  // Ajouter un produit dans la BDD et mettre à jour la liste locale
  addProduit(): void {
    const endpoint =
      this.newProduit.type === 'fruit'
        ? `${this.apiUrl}/fruits` // Utilisation de la route /api/fruits
        : `${this.apiUrl}/legumes`; // Utilisation de la route /api/legumes

    this.http.post(endpoint, this.newProduit).subscribe(
      (response: any) => {
        console.log('Produit ajouté avec succès :', response);

        // Ajouter le produit dans la liste locale
        if (this.newProduit.type === 'fruit') {
          this.fruits.push({ ...this.newProduit });
        } else {
          this.legumes.push({ ...this.newProduit });
        }

        // Réinitialiser le formulaire et fermer la modal
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        alert('Une erreur est survenue lors de l\'ajout du produit. Veuillez réessayer.');
      }
    );
  }
}
