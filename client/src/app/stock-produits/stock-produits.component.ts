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

  // Ajouter un produit (en local pour l'instant)
  addProduit(): void {
    if (this.newProduit.type === 'fruit') {
      this.fruits.push({ ...this.newProduit });
    } else {
      this.legumes.push({ ...this.newProduit });
    }
    this.closeModal();
  }
}
