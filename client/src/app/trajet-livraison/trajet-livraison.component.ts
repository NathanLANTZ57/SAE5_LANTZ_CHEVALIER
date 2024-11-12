import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-trajet-livraison',
  templateUrl: './trajet-livraison.component.html',
  styleUrls: ['./trajet-livraison.component.scss']
})
export class TrajetLivraisonComponent implements OnInit {
    private map!: L.Map;
    showTuesdayOptions = false;

    private epinalTrajet = [
      {
        name: "Église Saint Antoine",
        address: "12, rue Armand Colle",
        coords: [48.1741, 6.4489] as [number, number]
      },
      {
        name: "Ligue de l’enseignement",
        address: "15, rue Général de Reffye",
        coords: [48.1751, 6.4495] as [number, number]
      },
      {
        name: "Centre Léo Lagrange",
        address: "6, Avenue Salvador Allende",
        coords: [48.1760, 6.4505] as [number, number]
      }
    ];

    private dinozeTrajet = [
      {
        name: "APF - Local extérieur – ESAT",
        address: "Rue de la papeterie, Dinozé",
        coords: [48.1710, 6.4814] as [number, number]
      }
    ];

    private golbeyTrajet = [
      {
        name: "Ecodenn’ergie",
        address: "36 bis rue de la Plaine, Golbey",
        coords: [48.1995, 6.4296] as [number, number]
      },
      {
        name: "Botanic",
        address: "Avenue des Terres St Jean, Golbey",
        coords: [48.2008, 6.4235] as [number, number]
      }
    ];

    ngOnInit(): void {
      this.initMap();
      this.setDefaultIcon();
    }

    private initMap(): void {
      this.map = L.map('map').setView([48.28361, 6.9495], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    }

    private setDefaultIcon(): void {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',         
        shadowUrl: 'assets/marker-shadow.png'   
      });
    }

    showEpinalTrajet(): void {
      if (!this.map) {
        console.error('La carte n\'est pas initialisée');
        return;
      }

      this.clearMap();

      this.epinalTrajet.forEach(point => {
        L.marker(point.coords)
          .addTo(this.map)
          .bindPopup(`<b>${point.name}</b><br>${point.address}`);
      });

      const trajetCoords = this.epinalTrajet.map(point => point.coords);
      L.polyline(trajetCoords, { color: 'black', weight: 4, opacity: 0.7 })
        .addTo(this.map);

      const bounds = L.latLngBounds(trajetCoords);
      this.map.fitBounds(bounds);
    }

    showDinozeTrajet(): void {
      if (!this.map) {
        console.error('La carte n\'est pas initialisée');
        return;
      }

      this.clearMap();

      this.dinozeTrajet.forEach(point => {
        L.marker(point.coords)
          .addTo(this.map)
          .bindPopup(`<b>${point.name}</b><br>${point.address}`);
      });

      const trajetCoords = this.dinozeTrajet.map(point => point.coords);
      L.polyline(trajetCoords, { color: 'black', weight: 4, opacity: 0.7 })
        .addTo(this.map);

      const bounds = L.latLngBounds(trajetCoords);
      this.map.fitBounds(bounds);
    }

    showGolbeyTrajet(): void {
      if (!this.map) {
        console.error('La carte n\'est pas initialisée');
        return;
      }

      this.clearMap();

      this.golbeyTrajet.forEach(point => {
        L.marker(point.coords)
          .addTo(this.map)
          .bindPopup(`<b>${point.name}</b><br>${point.address}`);
      });

      const trajetCoords = this.golbeyTrajet.map(point => point.coords);
      L.polyline(trajetCoords, { color: 'black', weight: 4, opacity: 0.7 })
        .addTo(this.map);

      const bounds = L.latLngBounds(trajetCoords);
      this.map.fitBounds(bounds);
    }

    private clearMap(): void {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          this.map.removeLayer(layer);
        }
      });
    }
}
