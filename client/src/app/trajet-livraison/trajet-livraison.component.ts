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
  isModalOpen = false;
  newTrajet = { day: '', type: '', locations: [{ name: '', address: '', coords: [0, 0], pointNumber: 1 }] };

  // Ajout des propriétés nécessaires
  days = [
    {
      label: 'Mardi',
      value: 'Mardi',
      class: 'mardi',
      showOptions: false,
      trajets: []
    },
    {
      label: 'Mercredi',
      value: 'Mercredi',
      class: 'mercredi',
      showOptions: false,
      trajets: []
    },
    {
      label: 'Jeudi',
      value: 'Jeudi',
      class: 'jeudi',
      showOptions: false,
      trajets: []
    },
    {
      label: 'Vendredi',
      value: 'Vendredi',
      class: 'vendredi',
      showOptions: false,
      trajets: []
    }
  ];

  constructor(private http: HttpClient) { }

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
    this.days.forEach((day) => {
      day.trajets = this.trajets.filter((trajet) => trajet.day === day.value);
    });
    console.log('Filtered trajets by days:', this.days);
  }

  showTrajet(type: string): void {
    const trajet = this.trajets.find((t) => t.type === type);
    if (!trajet) {
      console.warn('Trajet not found!');
      return;
    }

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    // Clear existing markers
    this.map.eachLayer((layer: any) => {
      if (layer.options && layer.options.icon) {
        this.map.removeLayer(layer);
      }
    });

    // Add numbered markers
    trajet.locations.forEach((location: any, index: number) => {
      const markerIcon = L.divIcon({
        html: `<div style="position: relative;">
                  <img src="assets/marker-icon.png" style="width: 25px; height: 41px;">
                  <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                               color: black; font-size: 12px; font-weight: bold;">
                    ${index + 1}
                  </span>
               </div>`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        className: ''
      });

      L.marker(L.latLng(location.coords[0], location.coords[1]), { icon: markerIcon })
        .addTo(this.map)
        .bindPopup(`<b>Point ${index + 1}</b>: ${location.name}<br>${location.address}`);
    });

    // Add routing control with instructions disabled on the map
    this.routingControl = (L as any).Routing.control({
      waypoints: trajet.locations.map((location: any) =>
        L.latLng(location.coords[0], location.coords[1])
      ),
      routeWhileDragging: true,
      showAlternatives: true,
      lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
      createMarker: () => null, // Désactive les marqueurs de routage
      router: new (L as any).Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      addWaypoints: false, // Empêche l'ajout de points supplémentaires
      fitSelectedRoutes: true, // Centrer automatiquement la carte
      show: false, // Désactive les instructions sur la carte
    }).addTo(this.map);

    // Display instructions in the custom container
    this.routingControl.on('routesfound', (e: any) => {
      const instructionsContainer = document.getElementById('route-instructions');
      if (instructionsContainer) {
        // Videz le conteneur avant d'ajouter de nouvelles instructions
        instructionsContainer.innerHTML = '';

        // Récupérez les instructions de l'itinéraire
        const route = e.routes[0];
        const instructions = route.instructions.map((instr: any) =>
          `<div>${instr.text}</div>`
        ).join('');

        // Ajoutez les nouvelles instructions dans le conteneur
        instructionsContainer.innerHTML = `<h3>Instructions</h3>${instructions}`;
      }
    });


  }

  deleteTrajet(id: number): void {
    this.http.delete(`http://localhost:3000/api/trajets-livraison/${id}`).subscribe(() => {
      this.fetchTrajets();
    });
  }

  openAddModal(): void {
    this.isModalOpen = true;
  }

  closeAddModal(): void {
    this.isModalOpen = false;
    this.newTrajet = { day: '', type: '', locations: [{ name: '', address: '', coords: [0, 0], pointNumber: 1 }] };
  }

  addTrajet(): void {
    this.newTrajet.locations.forEach((location, index) => {
      location.pointNumber = index + 1;
    });

    this.http.post('http://localhost:3000/api/trajets-livraison', this.newTrajet).subscribe(() => {
      this.closeAddModal();
      this.fetchTrajets();
    });
  }

  addLocation(): void {
    this.newTrajet.locations.push({
      name: '',
      address: '',
      coords: [0, 0],
      pointNumber: this.newTrajet.locations.length + 1
    });
  }

  removeLocation(index: number): void {
    this.newTrajet.locations.splice(index, 1);
  }
}
