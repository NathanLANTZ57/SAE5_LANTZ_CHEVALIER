import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-semaine-livraison',
  templateUrl: './formulaire-semaine-livraison.component.html',
  styleUrls: ['./formulaire-semaine-livraison.component.scss']
})
export class FormulaireSemaineLivraisonComponent implements OnInit {
  year: number = new Date().getFullYear();
  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  weeks: (number | null)[][] = []; // Numéros de semaine
  selectedWeek: number | null = null; // Une seule semaine sélectionnée

  constructor(private adherentDataService: AdherentDataService, private router: Router) {}

  ngOnInit(): void {
    this.initializeWeeks();
    this.selectedWeek = this.adherentDataService.getData('selectedWeek') || null;
  }

  initializeWeeks(): void {
    const firstDayOfYear = new Date(this.year, 0, 1); // 1er janvier
    const lastDayOfYear = new Date(this.year, 11, 31); // 31 décembre
  
    const weeksPerMonth: (number | null)[][] = Array(12).fill(null).map(() => []);
  
    let currentDate = firstDayOfYear;
  
    while (currentDate <= lastDayOfYear) {
      const weekNumber = this.getWeekNumber(currentDate); // Calculer le numéro de semaine
      const month = currentDate.getMonth();
  
      // Ne pas ajouter la semaine 1 dans la dernière colonne
      if (month === 11 && weekNumber === 1) {
        break; // Ignorer la semaine 1 pour décembre
      }
  
      // Ajouter la semaine uniquement si elle n'est pas déjà présente
      if (!weeksPerMonth[month].includes(weekNumber) && weekNumber <= 52) {
        weeksPerMonth[month].push(weekNumber);
      }
  
      // Passer au jour suivant
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Complète chaque mois à 5 semaines max
    this.weeks = weeksPerMonth.map((weeks) => {
      while (weeks.length < 5) {
        weeks.push(null);
      }
      return weeks;
    });
  }
  
  
  
  

  // Générer les semaines réelles pour chaque mois
  generateWeeksForYear(year: number): (number | null)[][] {
    const weeksPerMonth: (number | null)[][] = [];
    for (let month = 0; month < 12; month++) {
      const weeksInMonth: (number | null)[] = [];
      let date = new Date(year, month, 1);

      // Parcourir chaque jour du mois
      while (date.getMonth() === month) {
        const weekNumber = this.getWeekNumber(date);
        if (!weeksInMonth.includes(weekNumber)) {
          weeksInMonth.push(weekNumber);
        }
        date.setDate(date.getDate() + 1);
      }

      weeksPerMonth.push(weeksInMonth);
    }
    return weeksPerMonth;
  }

  // Calculer le numéro de semaine (ISO 8601)
  getWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());
  const day = (tempDate.getDay() + 6) % 7; // Lundi = 0
  tempDate.setDate(tempDate.getDate() - day + 3); // Aller au jeudi de la semaine ISO
  const firstThursday = tempDate.getTime();
  tempDate.setMonth(0, 1); // Aller au 1er janvier
  if (tempDate.getDay() !== 4) {
    tempDate.setMonth(0, 1 + ((4 - tempDate.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tempDate.getTime()) / 604800000); // 604800000ms = 1 semaine
}

  
  

  isSelected(week: number): boolean {
    return this.selectedWeek === week;
  }

  toggleSelection(week: number): void {
    if (!week || week === 1 || week === 52) return; // Empêche la sélection des semaines 1 et 52
  
    // Si la semaine est déjà sélectionnée, la désélectionner
    this.selectedWeek = this.selectedWeek === week ? null : week;
  }
  
  

  isDisabled(week: number): boolean {
    return week === 1 || week === 52; // Désactiver les semaines 1 et 52
  }
  

  onNext(): void {
    if (!this.selectedWeek) {
      alert('Veuillez sélectionner une semaine.');
      return;
    }

    this.adherentDataService.setData('selectedWeek', this.selectedWeek);

    this.router.navigate(['/app-formulaire-mode-livraison']);
  }

  onBack(): void {
    this.router.navigate(['/app-formulaire-choix']);
  }
}
