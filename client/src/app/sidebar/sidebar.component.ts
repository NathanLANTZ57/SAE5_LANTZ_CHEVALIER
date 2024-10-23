import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   menuTitle = 'Menu';
   menuTitleOuvert = 'Tableau de bord';

   menuItems = [
     { link: '#', icon: 'assets/home-icon.png', label: 'Accueil' },
     { link: '#', icon: 'assets/basket-icon.png', label: 'Panier' },
     { link: '#', icon: 'assets/truck-icon.png', label: 'Livraisons' },
     { link: '#', icon: 'assets/profile-icon.png', label: 'Profil' },
     { link: '#', icon: 'assets/connexion.png', label: 'Connexion' }
  ];

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
   

}
