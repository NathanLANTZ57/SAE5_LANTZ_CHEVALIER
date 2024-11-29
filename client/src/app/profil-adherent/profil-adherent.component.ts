import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrls: ['./profil-adherent.component.scss']
})
export class ProfilAdherentComponent {

  editSection(section: string): void {
    alert(`Modification de la section : ${section}`);
  }

}
