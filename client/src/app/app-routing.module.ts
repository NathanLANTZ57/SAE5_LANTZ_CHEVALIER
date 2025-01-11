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
import { ProfilReprogrammationDateComponent } from './profil-reprogrammation-date/profil-reprogrammation-date.component';
import { ProfilReprogrammationPanierComponent } from './profil-reprogrammation-panier/profil-reprogrammation-panier.component';
import { ProfilReprogrammationTypePanierComponent } from './profil-reprogrammation-type-panier/profil-reprogrammation-type-panier.component';
import { ProfilReprogrammationNombrePanierComponent } from './profil-reprogrammation-nombre-panier/profil-reprogrammation-nombre-panier.component';
import { StockProduitsComponent } from './stock-produits/stock-produits.component';
import { CommandeClientComponent } from './commande-client/commande-client.component';
import { LegumeDeSaisonComponent } from './legume-de-saison/legume-de-saison.component';
import { FruitDeSaisonComponent } from './fruit-de-saison/fruit-de-saison.component';
import { InscriptionAdminComponent } from './inscription-admin/inscription-admin.component';
import { PaiementAdminComponent } from './paiement-admin/paiement-admin.component';
import { FormulaireValidationComponent } from './formulaire-validation/formulaire-validation.component';
import { FormulairePanierEmployeComponent } from './formulaire-panier-employe/formulaire-panier-employe.component';
import { PanierEmployeComponent } from './panier-employe/panier-employe.component';
import { FormulaireChoixPanierEmployeComponent } from './formulaire-choix-panier-employe/formulaire-choix-panier-employe.component';
import { FormulaireValidationEmployeComponent } from './formulaire-validation-employe/formulaire-validation-employe.component';
import { FormulaireValideEmployeComponent } from './formulaire-valide-employe/formulaire-valide-employe.component';

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
  { path: 'app-formulaire-iban', component: FormulaireIbanComponent},
  { path: 'app-profil-reprogrammation-date', component: ProfilReprogrammationDateComponent},
  { path: 'app-profil-reprogrammation-panier', component: ProfilReprogrammationPanierComponent},
  { path :'app-profil-reprogrammation-type-panier', component: ProfilReprogrammationTypePanierComponent},
  { path: 'app-profil-reprogrammation-nombre-panier', component: ProfilReprogrammationNombrePanierComponent},
  { path: 'stocks-produits', component: StockProduitsComponent},
  { path: 'commande-client', component: CommandeClientComponent},
  { path: 'legume-saison', component: LegumeDeSaisonComponent},
  { path: 'fruit-saison', component: FruitDeSaisonComponent},
  { path: 'inscription-admin', component: InscriptionAdminComponent},
  { path: 'paiement-admin', component: PaiementAdminComponent},
  { path: 'formulaire-validation', component: FormulaireValidationComponent},
  { path: 'formulaire-panier-employe', component: FormulairePanierEmployeComponent},
  { path: 'panier-employe', component: PanierEmployeComponent},
  { path: 'formulaire-choix-panier-employe', component: FormulaireChoixPanierEmployeComponent},
  { path: 'formulaire-validation-employe', component: FormulaireValidationEmployeComponent},
  { path: 'formulaire-valide-employe', component: FormulaireValideEmployeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
