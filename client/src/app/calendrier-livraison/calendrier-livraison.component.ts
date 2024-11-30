import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendrier-livraison',
  templateUrl: './calendrier-livraison.component.html',
  styleUrls: ['./calendrier-livraison.component.scss'],
})
export class CalendrierLivraisonComponent implements OnInit {
  currentDate: Date = new Date(); // Date actuelle
  daysInMonth: number[] = []; // Liste des jours dans le mois
  firstDayIndex: number = 0; // Index du premier jour (lundi = 0, etc.)
  dayNames: string[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']; // Noms des jours
  monthName: string = ''; // Nom du mois actuel en français

  // Modal
  isModalOpen: boolean = false; // État du modal
  selectedDay: number | null = null; // Jour sélectionné
  selectedDayLabel: string = ''; // Texte affiché dans le modal

  ngOnInit(): void {
    this.generateCalendar(this.currentDate);
  }

  // Génère le calendrier pour une date donnée
  generateCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Calcul du nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Calcul de l'index du premier jour (pour aligner le début du calendrier)
    const firstDay = new Date(year, month, 1);
    this.firstDayIndex = (firstDay.getDay() + 6) % 7; // Ajustement pour démarrer à lundi

    // Obtenir le nom du mois en français
    this.monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
  }

  // Change le mois affiché
  changeMonth(offset: number): void {
    const newMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.currentDate = newMonth;
    this.generateCalendar(newMonth);
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }


  // Ouvrir le modal
  openModal(day: number): void {
    this.selectedDay = day;
    const date = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
  
    // Formate le jour et le mois pour affichage
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  
    this.selectedDayLabel = `${formattedDayName} ${day} ${this.monthName}`;
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDay = null;
  }
  
}
