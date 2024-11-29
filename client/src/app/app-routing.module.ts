import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { PanierComponent } from './panier/panier.component';
import { DepotsComponent } from './depots/depots.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ProfilAdherentComponent } from './profil-adherent/profil-adherent.component';
import { FormulairePanierComponent } from './formulaire-panier/formulaire-panier.component';
import { FormulaireCotisationComponent } from './formulaire-cotisation/formulaire-cotisation.component';
import { FormulaireChoixComponent } from './formulaire-choix/formulaire-choix.component';
import { FormulaireModeLivraisonComponent } from './formulaire-mode-livraison/formulaire-mode-livraison.component';
import { FormulaireModePaiementComponent } from './formulaire-mode-paiement/formulaire-mode-paiement.component';
import { FormulaireSemaineLivraisonComponent } from './formulaire-semaine-livraison/formulaire-semaine-livraison.component';
import { FormulaireIbanComponent } from './formulaire-iban/formulaire-iban.component';


const routes: Routes = [
  { path: '', component: AccueilAdherentComponent },
  { path: 'faits-divers', component: FaitsDiversComponent },
  { path: 'app-panier', component: PanierComponent },
  { path: 'app-depots', component: DepotsComponent },
  { path: 'app-livraison', component: LivraisonComponent },
  { path: 'app-profil-adherent', component: ProfilAdherentComponent },
  { path: 'app-formulaire-panier', component: FormulairePanierComponent },
  { path: 'app-formulaire-cotisation', component: FormulaireCotisationComponent },
  { path: 'app-formulaire-choix', component: FormulaireChoixComponent },
  { path: 'app-formulaire-mode-livraison', component: FormulaireModeLivraisonComponent},
  { path: 'app-formulaire-mode-paiement', component: FormulaireModePaiementComponent},
  { path: 'app-formulaire-semaine-livraison', component: FormulaireSemaineLivraisonComponent},
  { path: 'app-formulaire-iban', component: FormulaireIbanComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
