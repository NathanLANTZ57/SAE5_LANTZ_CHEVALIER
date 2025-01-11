import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendrier-livraison',
  templateUrl: './calendrier-livraison.component.html',
  styleUrls: ['./calendrier-livraison.component.scss'],
})
export class CalendrierLivraisonComponent implements OnInit {
  currentDate: Date = new Date();
  daysInMonth: number[] = []; 
  firstDayIndex: number = 0; 
  dayNames: string[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']; 
  monthName: string = ''; 

  isModalOpen: boolean = false; 
  selectedDay: number | null = null; 
  selectedDayLabel: string = ''; 

  ngOnInit(): void {
    this.generateCalendar(this.currentDate);
  }

  generateCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const firstDay = new Date(year, month, 1);
    this.firstDayIndex = (firstDay.getDay() + 6) % 7; 

    this.monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
  }

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

  openModal(day: number): void {
    this.selectedDay = day;
    const date = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
  
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
