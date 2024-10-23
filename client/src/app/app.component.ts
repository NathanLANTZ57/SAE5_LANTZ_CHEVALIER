import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Titre principal de la page (visible dans le header)
  title = 'SAE5_LANTZ_CHEVALIER';

  // Titre de la page affiché en grand dans le header
  pageTitle = 'Jardin de Cocagne';

  // Titre du menu latéral
  menuTitle = 'Menu';

  // Éléments du menu (avec icône et lien)
  menuItems = [
    { link: '#', icon: 'assets/home-icon.png', label: 'Accueil' },
    { link: '#', icon: 'assets/basket-icon.png', label: 'Panier' },
    { link: '#', icon: 'assets/truck-icon.png', label: 'Livraisons' },
    { link: '#', icon: 'assets/profile-icon.png', label: 'Profil' },
    { link: '#', icon: 'assets/connexion.png', label: 'Connexion' }
  ];
  

  // Liste des cartes à afficher avec image, texte alternatif et titre
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
