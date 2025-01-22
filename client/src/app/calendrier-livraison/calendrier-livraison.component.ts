import { Component, OnInit } from '@angular/core';
import { JoursLivraisonService } from '../services/jours-livraison.service';

interface DeliveryDay {
  id?: number;
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
  isWeeklyDelivery: boolean = false;
  isRecurringDelivery: boolean = false;

  selectedTournee: string = 'all';
  selectedFrequency: string = 'all';
  openWeeks: string = '';
  tournees: string[] = ['Tour 1', 'Tour 2', 'Tour 3'];
  frequencies: string[] = ['Toutes les semaines', 'Toutes les 2 semaines'];

  holidays: Date[] = [
    new Date('2025-01-01'), // Nouvel An
    new Date('2025-04-18'), // Vendredi Saint (Alsace-Moselle)
    new Date('2025-04-21'), // Lundi de Pâques
    new Date('2025-05-01'), // Fête du Travail
    new Date('2025-05-08'), // Fête de la Victoire
    new Date('2025-05-29'), // Ascension
    new Date('2025-06-09'), // Lundi de Pentecôte
    new Date('2025-07-14'), // Fête Nationale
    new Date('2025-08-15'), // Assomption
    new Date('2025-11-01'), // Toussaint
    new Date('2025-11-11'), // Armistice
    new Date('2025-12-25'), // Noël
    new Date('2025-12-26'), // Saint-Étienne (Alsace-Moselle)
  ];

  deliveryDays: DeliveryDay[] = [];

  closedDays: Date[] = [
    new Date('2025-01-01'),
    new Date('2025-01-02'),
    new Date('2025-01-03'),
    new Date('2025-01-04'),
    new Date('2025-01-05'),
    new Date('2025-12-29'),
    new Date('2025-12-30'),
    new Date('2025-12-31')
  ];

  constructor(private joursLivraisonService: JoursLivraisonService) { }

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

    this.joursLivraisonService.getJoursLivraison(year, month).subscribe(
      (data) => {
        this.deliveryDays = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des jours de livraison :', error);
      }
    );
  }

  changeMonth(offset: number): void {
    const newDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.currentDate = newDate;
    this.generateCalendar(newDate);
    this.loadDeliveryDays();
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

  isClosedDay(day: number): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.closedDays.some((closedDay) => closedDay.toDateString() === date.toDateString());
  }

  isFilteredDeliveryDay(day: number): boolean {
    const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Filtrer les livraisons par date
    const deliveries = this.deliveryDays.filter((delivery) => delivery.date === dateKey);

    // Vérifier si au moins une livraison correspond à la tournée et à la fréquence
    const tourneeMatches = deliveries.some((delivery) =>
      this.selectedTournee === 'all' || delivery.tournee === this.selectedTournee
    );

    const frequencyMatches = deliveries.some((delivery) =>
      this.selectedFrequency === 'all' || delivery.frequence === this.selectedFrequency
    );

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
    if (this.selectedTournee === 'all' || this.selectedFrequency === 'all') {
      alert('Veuillez sélectionner une tournée et une fréquence avant d’ajouter un jour de livraison.');
      return;
    }

    if (this.selectedDay) {
      const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.selectedDay);

      // Vérifier si le jour est fermé
      if (this.isClosedDay(this.selectedDay)) {
        alert('Ce jour est fermé. Aucune livraison n’est possible.');
        return;
      }

      // Vérifier si le jour est un jour férié
      if (this.isHoliday(this.selectedDay)) {
        alert('Il n’y a pas de livraison sur les jours fériés.');
        return;
      }
    }

    if (this.selectedDay && this.isCustomDelivery) {
      const selectedFrequency = this.selectedFrequency;
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const startDate = new Date(year, month, this.selectedDay);

      if (this.isWeeklyDelivery) {
        this.addWeeklyDeliveries(startDate);
      } else if (this.isRecurringDelivery && selectedFrequency !== 'all') {
        const interval = selectedFrequency === 'Toutes les semaines' ? 7 : 14;
        this.addRecurringDeliveries(startDate, interval);
      } else {
        this.addSingleDayDelivery();
      }
    }
  }

  addWeeklyDeliveries(startDate: Date): void {
    const daysToAdd: DeliveryDay[] = [];
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const dayOfWeek = startDate.getDay();

    for (let day = 1; day <= this.daysInMonth.length; day++) {
      const date = new Date(year, month, day);

      // Vérifier si c'est le bon jour de la semaine
      if (date.getDay() === dayOfWeek) {
        // Décaler si le jour est férié ou fermé
        let validDate = date;
        while (this.isHoliday(validDate.getDate()) || this.isClosedDay(validDate.getDate())) {
          validDate = new Date(validDate.getFullYear(), validDate.getMonth(), validDate.getDate() + 1);
        }

        const dateKey = `${validDate.getFullYear()}-${(validDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${validDate.getDate().toString().padStart(2, '0')}`;

        daysToAdd.push({
          id: 0,
          date: dateKey,
          tournee: this.selectedTournee || 'Non spécifiée',
          frequence: 'Toutes les semaines',
        });
      }
    }

    this.joursLivraisonService.addMultipleJoursLivraison(daysToAdd).subscribe(() => {
      this.deliveryDays = [...this.deliveryDays, ...daysToAdd];
      this.closeModal();
    });
  }

  addRecurringDeliveries(startDate: Date, interval: number): void {
    const daysToAdd: DeliveryDay[] = [];
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    let day = startDate.getDate();

    while (day <= this.daysInMonth.length) {
      let validDate = new Date(year, month, day);

      // Décaler si le jour est férié ou fermé
      while (this.isHoliday(validDate.getDate()) || this.isClosedDay(validDate.getDate())) {
        validDate = new Date(validDate.getFullYear(), validDate.getMonth(), validDate.getDate() + 1);
      }

      const dateKey = `${validDate.getFullYear()}-${(validDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${validDate.getDate().toString().padStart(2, '0')}`;

      daysToAdd.push({
        id: 0,
        date: dateKey,
        tournee: this.selectedTournee || 'Non spécifiée',
        frequence: this.selectedFrequency,
      });

      day += interval;
    }

    this.joursLivraisonService.addMultipleJoursLivraison(daysToAdd).subscribe(() => {
      this.deliveryDays = [...this.deliveryDays, ...daysToAdd];
      this.closeModal();
    });
  }


  addSingleDayDelivery(): void {
    const dateKey = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.selectedDay!.toString().padStart(2, '0')}`;

    const newDelivery: DeliveryDay = {
      id: this.deliveryDays.length ? Math.max(...this.deliveryDays.map((d) => d.id)) + 1 : 1,
      date: dateKey,
      tournee: this.selectedTournee || 'Non spécifiée',
      frequence: this.selectedFrequency || 'Toutes les semaines',
    };

    this.joursLivraisonService.addJourLivraison(newDelivery).subscribe(() => {
      this.deliveryDays.push(newDelivery);
      this.closeModal();
    });
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
      }
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDay = null;
    this.isWeeklyDelivery = false;
    this.isRecurringDelivery = false;
  }

  openModal(day: number): void {
    const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

    // Vérifier si le jour est fermé
    if (this.isClosedDay(day)) {
      alert('Ce jour est fermé. Aucune livraison n’est possible.');
      return;
    }

    // Vérifier si le jour est un jour férié
    if (this.isHoliday(day)) {
      alert('Il n’y a pas de livraison sur les jours fériés.');
      return;
    }

    this.selectedDay = day;
    const dayName = selectedDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    this.selectedDayLabel = `${formattedDayName} ${day} ${this.monthName}`;
    this.isCustomDelivery = this.isFilteredDeliveryDay(day);
    this.isWeeklyDelivery = false;
    this.isRecurringDelivery = false;
    this.isModalOpen = true;
  }

}
