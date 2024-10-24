import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  menuTitle = 'Menu';
  menuTitleOuvert = 'Tableau de bord';

  menuItems = [
    { link: '#', label: 'Accueil', icon: 'assets/home-icon.png' },
    { link: '#', label: 'Panier', icon: 'assets/basket-icon.png' },
    { link: '#', label: 'Livraisons', icon: 'assets/truck-icon.png' },
    { link: '#', label: 'Faits divers', icon: 'assets/faitsDivers.png' },
    { link: '#', label: 'Profil', icon: 'assets/pageprofil.png' },
  ];

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.toggle('open', this.isSidebarOpen);
    }
  }
  
}
