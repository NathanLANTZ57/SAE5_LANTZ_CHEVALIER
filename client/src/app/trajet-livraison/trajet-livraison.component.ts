import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-trajet-livraison',
  templateUrl: './trajet-livraison.component.html',
  styleUrls: ['./trajet-livraison.component.scss']
})
export class TrajetLivraisonComponent implements OnInit {
  map!: L.Map;
  trajets: any[] = [];
  trajetsMardi: any[] = [];
  trajetsMercredi: any[] = [];
  trajetsJeudi: any[] = [];
  trajetsVendredi: any[] = [];

  showTuesdayOptions = false;
  showWednesdayOptions = false;
  showThursdayOptions = false;
  showFridayOptions = false;

  isModalOpen = false;
  newTrajet = { day: '', type: '', locations: [{ name: '', address: '', coords: [0, 0] }] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.fetchTrajets();
  }

  initMap(): void {
    this.map = L.map('map').setView([48.28361, 6.9495], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  fetchTrajets(): void {
    this.http.get<any[]>('http://localhost:3000/api/trajets-livraison').subscribe((data) => {
      this.trajets = data;
      this.filterTrajetsByDay();
    });
  }

  filterTrajetsByDay(): void {
    this.trajetsMardi = this.trajets.filter((trajet) => trajet.day === 'Mardi');
    this.trajetsMercredi = this.trajets.filter((trajet) => trajet.day === 'Mercredi');
    this.trajetsJeudi = this.trajets.filter((trajet) => trajet.day === 'Jeudi');
    this.trajetsVendredi = this.trajets.filter((trajet) => trajet.day === 'Vendredi');
  }

  showTrajet(type: string): void {
    const trajet = this.trajets.find((t) => t.type === type);
    if (!trajet) return;

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        this.map.removeLayer(layer);
      }
    });

    trajet.locations.forEach((location: any) => {
      L.marker(location.coords as [number, number])
        .addTo(this.map)
        .bindPopup(`<b>${location.name}</b><br>${location.address}`);
    });

    const coords = trajet.locations.map((l: any) => l.coords);
    L.polyline(coords, { color: 'black', weight: 4 }).addTo(this.map);
    this.map.fitBounds(L.latLngBounds(coords));
  }

  deleteTrajet(id: number): void {
    this.http.delete(`http://localhost:3000/api/trajets-livraison/${id}`).subscribe(() => {
      this.fetchTrajets();
    });
  }
  
  removeLocation(index: number): void {
    this.newTrajet.locations.splice(index, 1);
  }
  

  openAddModal(): void {
    this.isModalOpen = true;
  }

  closeAddModal(): void {
    this.isModalOpen = false;
    this.newTrajet = { day: '', type: '', locations: [{ name: '', address: '', coords: [0, 0] }] };
  }

  addTrajet(): void {
    this.http.post('http://localhost:3000/api/trajets-livraison', this.newTrajet).subscribe(() => {
      this.closeAddModal();
      this.fetchTrajets();
    });
  }

  addLocation(): void {
    this.newTrajet.locations.push({ name: '', address: '', coords: [0, 0] });
  }
}
