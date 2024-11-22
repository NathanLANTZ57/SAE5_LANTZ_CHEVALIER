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
  showWesdayOptions = false;
  showThudayOptions = false;
  showFridayOptions = false;

  private trajets = {
    epinalMardi: [
      { name: "Église Saint Antoine", address: "12, rue Armand Colle", coords: [48.1741, 6.4489] },
      { name: "Ligue de l’enseignement", address: "15, rue Général de Reffye", coords: [48.1751, 6.4495] },
      { name: "Centre Léo Lagrange", address: "6, Avenue Salvador Allende", coords: [48.1760, 6.4505] }
    ],
    dinoze: [
      { name: "APF - Local extérieur – ESAT", address: "Rue de la papeterie, Dinozé", coords: [48.1710, 6.4814] }
    ],
    golbeyMardi: [
      { name: "Ecodenn’ergie", address: "36 bis rue de la Plaine, Golbey", coords: [48.1995, 6.4296] },
      { name: "Botanic", address: "Avenue des Terres St Jean, Golbey", coords: [48.2008, 6.4235] }
    ],
    epinalMercredi: [
      { name: "Église Saint Antoine", address: "12 rue Armand Colle", coords: [48.173, 6.4492] },
      { name: "Botanic", address: "Avenue des Terres St Jean, Golbey", coords: [48.2008, 6.4240] },
      { name: "Centre Léo Lagrange", address: "6 Avenue Salvador Allende", coords: [48.1738, 6.4553] },
      { name: "Chambre d’Agriculture", address: "17 rue André Vitu", coords: [48.1754, 6.4482] },
      { name: "Ligue de l’enseignement", address: "15 rue Général de Reffye", coords: [48.1748, 6.4521] }
    ],    
    golbey: [
      { name: "Ecodenn’ergie", address: "36 bis rue de la Plaine, Golbey", coords: [48.2000, 6.4243] }
    ],
    stNarbordMer: [
      { name: "Pharmacie Robert", address: "24 rue du Gal de Gaulle", coords: [48.2824, 6.9508] }
    ],
    remiremontMer: [
      { name: "Association AGACI", address: "26 rue de la Joncherie", coords: [48.0145, 6.5932] },
      { name: "Office du tourisme", address: "6 Place C. Poncelet", coords: [48.0140, 6.5857] }
    ],
    raonAuxBois: [
      { name: "", address: "7 rue du Savron", coords: [48.0602, 6.5643] }
    ],
    docellesMer: [
      { name: "Mr et Mme Boulassel", address: "1 rue Moncey", coords: [48.1506, 6.5743] }
    ],
    thaon: [
      { name: "Jardins de Cocagne", address: "Prairie Claudel", coords: [48.2444, 6.4039] }
    ],
    charmes: [
      { name: "Madame Pierot", address: "15 rue Ste Barbe", coords: [48.2444, 6.4039] }
    ],
    epinalVen: [
      { name: "Église Saint Antoine", address: "12 rue Armand Colle", coords: [48.1731, 6.4489] },
      { name: "Centre Léo Lagrange", address: "6 Avenue Salvador Allende", coords: [48.1742, 6.4551] },
      { name: "Botanic", address: "Avenue des Terres St Jean, Golbey", coords: [48.2010, 6.4236] },
      { name: "Ligue de l’enseignement", address: "15 rue Général de Reffye", coords: [48.1747, 6.4519] },
      { name: "3ème Rive Café Associatif", address: "15 rue du Maréchal Lyautey", coords: [48.1736, 6.4491] }
    ],
    bruyereVen: [
      { name: "Point Vert Mafra", address: "Zac Barbazan", coords: [48.2082, 6.7084] },
      { name: "Brico Marché", address: "2 rue de Fraisne", coords: [48.2065, 6.7102] }
    ],
    gerardmerVen: [
      { name: "Pro et Cie", address: "45 Boulevard d'Alsace", coords: [48.0748, 6.8775] }
    ],
    leTholyVen: [
      { name: "M. Lecomte François", address: "24 route du Noirpré", coords: [48.0676, 6.7532] }
    ]    
  };

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

    setTimeout(() => this.map.invalidateSize(), 0);
  }

  private setDefaultIcon(): void {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });
  }

  showTrajet(type: keyof typeof this.trajets): void {
    if (!this.map) {
      console.error('La carte n\'est pas initialisée');
      return;
    }

    this.clearMap();

    const trajet = this.trajets[type];
    const trajetCoords = trajet.map(point => point.coords);

    trajet.forEach(point => {
      L.marker(point.coords as [number, number])
        .addTo(this.map)
        .bindPopup(`<b>${point.name}</b><br>${point.address}`);
    });

    L.polyline(trajetCoords as [number, number][], { color: 'black', weight: 4, opacity: 0.7 }).addTo(this.map);
    this.map.fitBounds(L.latLngBounds(trajetCoords as [number, number][]));
  }

  private clearMap(): void {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        this.map.removeLayer(layer);
      }
    });
  }
}
