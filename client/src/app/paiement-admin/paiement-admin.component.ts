import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paiement-admin',
  templateUrl: './paiement-admin.component.html',
  styleUrls: ['./paiement-admin.component.scss']
})
export class PaiementAdminComponent implements OnInit {
  paiements: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPaiements();
  }

  fetchPaiements(): void {
    this.http.get('http://localhost:3000/api/adherentsabonne/all').subscribe(
      (data: any) => {
        console.log('Données récupérées :', data);
        this.paiements = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements :', error);
      }
    );
  }
  
  updatePaiementStatus(id: number, statut_paiement: string): void {
    this.http
      .patch(`http://localhost:3000/api/adherentsabonne/${id}/statut_paiement`, { statut_paiement })
      .subscribe(
        () => {
          alert(`Statut de paiement mis à jour : ${statut_paiement}`);
          this.fetchPaiements(); 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut de paiement :', error);
        }
      );
  }
}
