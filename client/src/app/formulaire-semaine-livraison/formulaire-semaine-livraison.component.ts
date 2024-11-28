import { Component } from '@angular/core';

@Component({
  selector: 'app-formulaire-semaine-livraison',
  templateUrl: './formulaire-semaine-livraison.component.html',
  styleUrls: ['./formulaire-semaine-livraison.component.scss']
})
export class FormulaireSemaineLivraisonComponent {
  year = 2024;

  // Liste des mois
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Numéros des semaines par mois
  weeks: (number | null)[][] = this.generateWeeksForYear(this.year);

  // Liste des cases sélectionnées
  selectedWeeks: number[] = [];

  // Génère les semaines pour l'année donnée
  generateWeeksForYear(year: number): (number | null)[][] {
    const weeksPerMonth: (number | null)[][] = Array(12).fill(null).map(() => []);
    const uniqueWeeks = new Set<number>(); // Pour éviter les doublons
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);

    // Boucle sur chaque jour de l'année
    let currentDate = firstDayOfYear;
    while (currentDate <= lastDayOfYear) {
      const month = currentDate.getMonth();
      const weekNumber = this.getWeekNumber(currentDate);

      // Ajoute la semaine au mois uniquement si elle n'a pas encore été affichée
      if (!uniqueWeeks.has(weekNumber)) {
        weeksPerMonth[month].push(weekNumber);
        uniqueWeeks.add(weekNumber);
      }

      // Passe au jour suivant
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Garde seulement les mois ayant au maximum 5 semaines visibles
    weeksPerMonth.forEach((weeks) => {
      while (weeks.length < 5) {
        weeks.push(null); // Ajoute des espaces vides si le mois a moins de 5 semaines
      }
    });

    return weeksPerMonth;
  }

  // Calcul du numéro de semaine selon la norme ISO 8601
  getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    const dayNum = (tempDate.getDay() + 6) % 7; // ISO: Lundi = 0, Dimanche = 6
    tempDate.setDate(tempDate.getDate() - dayNum + 3); // Fixer au jeudi de la semaine ISO
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((tempDate.getTime() - firstThursday.getTime()) / (24 * 60 * 60 * 1000) - 3) / 7);
    return weekNumber;
  }

  // Gère la sélection d'une case
  toggleSelection(week: number | null): void {
    if (week !== null && week !== 1 && week !== 52 && week !== 53) {
      const index = this.selectedWeeks.indexOf(week);
      if (index === -1) {
        this.selectedWeeks.push(week);
      } else {
        this.selectedWeeks.splice(index, 1);
      }
    }
  }

  // Vérifie si une case est sélectionnée
  isSelected(week: number | null): boolean {
    return week !== null && this.selectedWeeks.includes(week);
  }

  // Vérifie si une case est désactivée
  isDisabled(week: number | null): boolean {
    return week === null || week === 1 || week === 52 || week === 53;
  }
}
