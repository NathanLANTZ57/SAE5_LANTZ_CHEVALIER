import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendrier-livraison',
  templateUrl: './calendrier-livraison.component.html',
  styleUrls: ['./calendrier-livraison.component.scss']
})
export class CalendrierLivraisonComponent implements OnInit {

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  monthNames: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  dayNames: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  calendarDays: any[] = [];

  ngOnInit() {
    this.generateCalendar();
  }
  generateCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const weeks = [];
    let week = [];

    let dayOfWeek = (firstDay.getDay() + 6) % 7;

    for (let i = 0; i < dayOfWeek; i++) {
      week.push({ date: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 5) {
        weeks.push(week);
        week = [];
      }
      week.push({ date: day });
    }

    while (week.length < 10) {
      week.push({ date: null });
    }
    weeks.push(week);

    this.calendarDays = weeks;
  }


  getDayClass(day: any) {
    if (!day.date) return '';
    const dayOfWeek = new Date(this.year, this.month, day.date).getDay();
    return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][dayOfWeek];
  }

}
