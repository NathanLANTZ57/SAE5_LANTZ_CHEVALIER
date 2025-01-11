import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription-admin',
  templateUrl: './inscription-admin.component.html',
  styleUrls: ['./inscription-admin.component.scss']
})
export class InscriptionAdminComponent implements OnInit {
  pendingAdherents: any[] = [];
  pendingEmployees: any[] = []; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPendingAdherents();
    this.getPendingEmployees(); 
  }

  getPendingEmployees(): void {
    this.http.get('http://localhost:3000/api/employes/status?status=pending').subscribe(
      (employees: any) => {
        this.pendingEmployees = employees;
      },
      (error) => {
        console.error('Erreur lors du chargement des employés', error);
      }
    );
  }

  updateEmployeeStatus(id: number, status: string): void {
    this.http.patch(`http://localhost:3000/api/employes/${id}/status`, { status }).subscribe(
      (response: any) => {
        alert(`Statut mis à jour: ${status}`);
        this.getPendingEmployees(); 
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    );
  }

  getPendingAdherents(): void {
    this.http.get('http://localhost:3000/api/adherents/status?status=pending').subscribe(
      (adherents: any) => {
        this.pendingAdherents = adherents;
      },
      (error) => {
        console.error('Erreur lors du chargement des adhérents', error);
      }
    );
  }

  updateAdherentStatus(id: number, status: string): void {
    this.http.patch(`http://localhost:3000/api/adherents/${id}/status`, { status }).subscribe(
      (response: any) => {
        alert(`Statut mis à jour: ${status}`);
        this.getPendingAdherents(); 
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    );
  }
}
