import { Component, OnInit } from '@angular/core';
import { JoursLivraisonService } from '../services/jours-livraison.service';

interface DeliveryDay {
  id: number;
  date: string;
  tournee: string;
  frequence: string;
}

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
  isCustomDelivery: boolean = false;

  selectedTournee: string = 'all';
  selectedFrequency: string = 'all';
  openWeeks: string = '';
  tournees: string[] = ['Tour 1', 'Tour 2', 'Tour 3'];
  frequencies: string[] = ['Toutes les semaines', 'Toutes les 2 semaines', 'Toutes les 3 semaines'];

  holidays: Date[] = [new Date('2025-01-01'), new Date('2025-12-25')];
  deliveryDays: DeliveryDay[] = [];

  constructor(private joursLivraisonService: JoursLivraisonService) {}

  ngOnInit(): void {
    this.generateCalendar(this.currentDate);
    this.loadDeliveryDays();
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

  loadDeliveryDays(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;

    this.joursLivraisonService.getJoursLivraison(year, month).subscribe((data) => {
      this.deliveryDays = data;
    });
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }

  isHoliday(day: number): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.holidays.some((holiday) => holiday.toDateString() === date.toDateString());
  }

  isClosedWeek(day: number): boolean {
    const week = Math.ceil(day / 7);
    if (!this.openWeeks) return false;

    const weeks = this.openWeeks.split(',').flatMap((range) =>
      range.includes('-')
        ? Array.from(
            { length: +range.split('-')[1] - +range.split('-')[0] + 1 },
            (_, i) => +range.split('-')[0] + i
          )
        : [+range]
    );
    return !weeks.includes(week);
  }

  isFilteredDeliveryDay(day: number): boolean {
    const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const delivery = this.deliveryDays.find((delivery) => delivery.date === dateKey);

    if (!delivery) return false;

    const tourneeMatches =
      this.selectedTournee === 'all' || delivery.tournee === this.selectedTournee;

    const frequencyMatches =
      this.selectedFrequency === 'all' || delivery.frequence === this.selectedFrequency;

    return tourneeMatches && frequencyMatches;
  }

  getFrequency(day: number): string | undefined {
    const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return this.deliveryDays.find((delivery) => delivery.date === dateKey)?.frequence;
  }

  updateCalendar(): void {
    console.log('Tournée sélectionnée:', this.selectedTournee);
    console.log('Fréquence sélectionnée:', this.selectedFrequency);
    console.log('Semaines d\'ouverture:', this.openWeeks);
  }

  saveDayConfiguration(): void {
    if (this.selectedDay) {
      const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${this.selectedDay.toString().padStart(2, '0')}`;

      if (this.isCustomDelivery) {
        const newDelivery = {
          id: this.deliveryDays.length ? Math.max(...this.deliveryDays.map((d) => d.id)) + 1 : 1,
          date: dateKey,
          tournee: this.selectedTournee || 'Non spécifiée',
          frequence: this.selectedFrequency || 'Toutes les semaines',
        };

        this.joursLivraisonService.addJourLivraison(newDelivery).subscribe(() => {
          this.deliveryDays.push(newDelivery);
          this.closeModal();
        });
      } else {
        const delivery = this.deliveryDays.find((d) => d.date === dateKey);
        if (delivery) {
          this.deleteDelivery();
        }
      }
    }
  }

  deleteDelivery(): void {
    if (this.selectedDay) {
      const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${this.selectedDay.toString().padStart(2, '0')}`;

      const delivery = this.deliveryDays.find((d) => d.date === dateKey);

      if (delivery && delivery.id) {
        this.joursLivraisonService.deleteJourLivraison(delivery.id).subscribe(() => {
          this.deliveryDays = this.deliveryDays.filter((d) => d.id !== delivery.id);
          this.isCustomDelivery = false;
          this.closeModal();
        });
      } else {
        console.error('Aucune tournée trouvée ou ID manquant pour ce jour.');
      }
    }
  }

  openModal(day: number): void {
    this.selectedDay = day;
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    this.selectedDayLabel = `${formattedDayName} ${day} ${this.monthName}`;
    this.isCustomDelivery = this.isFilteredDeliveryDay(day);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDay = null;
  }

  changeMonth(offset: number): void {
    const newMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.currentDate = newMonth;
    this.generateCalendar(newMonth);
    this.loadDeliveryDays();
  }
}
