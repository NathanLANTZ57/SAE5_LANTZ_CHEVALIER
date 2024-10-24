import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';

const routes: Routes = [
  { path: '', component: AccueilAdherentComponent },
  { path: 'faits-divers', component: FaitsDiversComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
