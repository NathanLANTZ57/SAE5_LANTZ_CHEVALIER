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
  newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; 

  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLegumes();
    this.fetchFruits();
  }

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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newProduit = { type: 'legume', categorie: '', nom: '', quantite: '' }; 
  }

  addProduit(): void {
    const endpoint =
      this.newProduit.type === 'fruit'
        ? `${this.apiUrl}/fruits` 
        : `${this.apiUrl}/legumes`; 

    this.http.post(endpoint, this.newProduit).subscribe(
      (response: any) => {
        console.log('Produit ajouté avec succès :', response);

        if (this.newProduit.type === 'fruit') {
          this.fruits.push({ ...this.newProduit });
        } else {
          this.legumes.push({ ...this.newProduit });
        }

        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        alert('Une erreur est survenue lors de l\'ajout du produit. Veuillez réessayer.');
      }
    );
  }
}
