import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil-modal-historique-paiement',
  templateUrl: './profil-modal-historique-paiement.component.html',
  styleUrls: ['./profil-modal-historique-paiement.component.scss']
})
export class ProfilModalHistoriquePaiementComponent {

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); 
  }

}
