import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil-modal-livraison',
  templateUrl: './profil-modal-livraison.component.html',
  styleUrls: ['./profil-modal-livraison.component.scss']
})
export class ProfilModalLivraisonComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); 
  }
}
