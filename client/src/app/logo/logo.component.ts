import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  pageTitle = 'Jardin de Cocagne';

  imageLogo = 'assets/cocagne-vert.png';
}
