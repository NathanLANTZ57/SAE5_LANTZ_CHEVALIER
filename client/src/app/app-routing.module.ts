import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { LivraisonComponent } from './livraison/livraison.component';

const routes: Routes = [
  { path: '', component: AccueilAdherentComponent },
  { path: 'faits-divers', component: FaitsDiversComponent },
  { path: 'app-livraison', component: LivraisonComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
