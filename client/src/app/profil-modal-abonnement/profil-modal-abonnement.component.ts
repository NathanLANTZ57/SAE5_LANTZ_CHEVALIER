import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil-modal-abonnement',
  templateUrl: './profil-modal-abonnement.component.html',
  styleUrls: ['./profil-modal-abonnement.component.scss']
})
export class ProfilModalAbonnementComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); 
  }
}
