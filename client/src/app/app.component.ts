import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SAE5_LANTZ_CHEVALIER';

  pageTitle = 'Jardin de Cocagne';

  imageLogo = 'assets/cocagne-vert.png';


 

  cards = [
    { image: 'assets/legumes-de-saison.jpg', alt: 'Légumes de saison', title: 'Les légumes de saison' },
    { image: 'assets/fruits-de-saison.jpg', alt: 'Fruits de saison', title: 'Les fruits de saison' },
    { image: 'assets/paniers.jpg', alt: 'Les paniers', title: 'Les paniers' },
    { image: 'assets/dates-livraison.jpg', alt: 'Dates de livraisons', title: 'Les dates de livraisons' },
    { image: 'assets/depots.jpg', alt: 'Dépôts', title: 'Les dépôts' },
    { image: 'assets/absence.jpg', alt: 'Signaler une absence', title: 'Signaler une absence' },
    { image: 'assets/profil.jpg', alt: 'Accéder au profil', title: 'Accéder au profil' },
    { image: 'assets/abonnement.jpg', alt: 'Mon abonnement', title: 'Mon abonnement' },
    { image: 'assets/suivre-panier.jpg', alt: 'Suivre mon panier', title: 'Suivre mon panier' }
  ];
}
