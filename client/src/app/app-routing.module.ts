import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { PanierComponent } from './panier/panier.component';
import { DepotsComponent } from './depots/depots.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ProfilAdherentComponent } from './profil-adherent/profil-adherent.component';


const routes: Routes = [
  { path: '', component: AccueilAdherentComponent },
  { path: 'faits-divers', component: FaitsDiversComponent },
  { path: 'app-panier', component: PanierComponent },
  { path: 'app-depots', component: DepotsComponent },
  { path: 'app-livraison', component: LivraisonComponent },
  { path: 'app-profil-adherent', component: ProfilAdherentComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
