import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-reprogrammation-date',
  templateUrl: './profil-reprogrammation-date.component.html',
  styleUrls: ['./profil-reprogrammation-date.component.scss']
})
export class ProfilReprogrammationDateComponent {

  selectedDate: string | null = null;

selectDate(date: string): void {
    this.selectedDate = date;
    console.log('Date sélectionnée :', this.selectedDate);
}


}
