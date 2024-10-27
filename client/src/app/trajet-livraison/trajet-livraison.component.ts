import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-trajet-livraison',
  templateUrl: './trajet-livraison.component.html',
  styleUrls: ['./trajet-livraison.component.scss']
})
export class TrajetLivraisonComponent implements OnInit {
    private map: L.Map | undefined;

    ngOnInit(): void {
      this.initMap();
    }
    private initMap(): void {
      this.map = L.map('map').setView([48.8566, 2.3522], 13);
    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 0); // Cela force Leaflet à recalculer la taille de la carte
    }
    
}
