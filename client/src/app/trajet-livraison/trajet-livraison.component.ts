import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-trajet-livraison',
  templateUrl: './trajet-livraison.component.html',
  styleUrls: ['./trajet-livraison.component.scss']
})
export class TrajetLivraisonComponent implements OnInit {
  map!: L.Map;
  routingControl: any;
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
      console.log('Fetched trajets:', data);
      this.trajets = data;
      this.filterTrajetsByDay();
    });
  }

  filterTrajetsByDay(): void {
    this.trajetsMardi = this.trajets.filter((trajet) => trajet.day === 'Mardi');
    this.trajetsMercredi = this.trajets.filter((trajet) => trajet.day === 'Mercredi');
    this.trajetsJeudi = this.trajets.filter((trajet) => trajet.day === 'Jeudi');
    this.trajetsVendredi = this.trajets.filter((trajet) => trajet.day === 'Vendredi');
    console.log('Trajets par jour:', {
      Mardi: this.trajetsMardi,
      Mercredi: this.trajetsMercredi,
      Jeudi: this.trajetsJeudi,
      Vendredi: this.trajetsVendredi,
    });
  }

  showTrajet(type: string): void {
    console.log('Clicked trajet type:', type);
    const trajet = this.trajets.find((t) => t.type === type);
    console.log('Found trajet:', trajet);

    if (!trajet) {
      console.warn('Trajet not found!');
      return;
    }

    if (this.routingControl) {
      console.log('Removing existing routing control...');
      this.map.removeControl(this.routingControl);
    }

    console.log('Waypoints:', trajet.locations.map((location: any) => location.coords));

    this.routingControl = (L as any).Routing.control({
      waypoints: trajet.locations.map((location: any) =>
        L.latLng(location.coords[0], location.coords[1])
      ),
      routeWhileDragging: true,
      showAlternatives: true,
      lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
    }).addTo(this.map);

    console.log('Routing control added.');
  }

  deleteTrajet(id: number): void {
    console.log('Deleting trajet with id:', id);
    this.http.delete(`http://localhost:3000/api/trajets-livraison/${id}`).subscribe(() => {
      this.fetchTrajets();
    });
  }

  removeLocation(index: number): void {
    console.log('Removing location at index:', index);
    this.newTrajet.locations.splice(index, 1);
  }

  openAddModal(): void {
    console.log('Opening modal...');
    this.isModalOpen = true;
  }

  closeAddModal(): void {
    console.log('Closing modal...');
    this.isModalOpen = false;
    this.newTrajet = { day: '', type: '', locations: [{ name: '', address: '', coords: [0, 0] }] };
  }

  addTrajet(): void {
    console.log('Adding new trajet:', this.newTrajet);
    this.http.post('http://localhost:3000/api/trajets-livraison', this.newTrajet).subscribe(() => {
      this.closeAddModal();
      this.fetchTrajets();
    });
  }

  addLocation(): void {
    console.log('Adding new location to trajet...');
    this.newTrajet.locations.push({ name: '', address: '', coords: [0, 0] });
  }
}
