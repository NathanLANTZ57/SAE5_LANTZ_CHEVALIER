import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule pour les requêtes HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepotsComponent } from './depots/depots.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { LogoComponent } from './logo/logo.component';
import { PanierComponent } from './panier/panier.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { CalendrierLivraisonComponent } from './calendrier-livraison/calendrier-livraison.component';
import { TrajetLivraisonComponent } from './trajet-livraison/trajet-livraison.component';
import { ProfilAdherentComponent } from './profil-adherent/profil-adherent.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { FormulairePanierComponent } from './formulaire-panier/formulaire-panier.component';
import { FormulaireCotisationComponent } from './formulaire-cotisation/formulaire-cotisation.component';
import { FormulaireChoixComponent } from './formulaire-choix/formulaire-choix.component';
import { FormulaireModeLivraisonComponent } from './formulaire-mode-livraison/formulaire-mode-livraison.component';
import { FormulaireModePaiementComponent } from './formulaire-mode-paiement/formulaire-mode-paiement.component';
import { FormulaireSemaineLivraisonComponent } from './formulaire-semaine-livraison/formulaire-semaine-livraison.component';
import { FormulaireIbanComponent } from './formulaire-iban/formulaire-iban.component';
import { ProfilModalAbonnementComponent } from './profil-modal-abonnement/profil-modal-abonnement.component';
import { ProfilModalLivraisonComponent } from './profil-modal-livraison/profil-modal-livraison.component';
import { ProfilModalHistoriquePaiementComponent } from './profil-modal-historique-paiement/profil-modal-historique-paiement.component';
import { ProfilReprogrammationDateComponent } from './profil-reprogrammation-date/profil-reprogrammation-date.component';
import { ProfilReprogrammationPanierComponent } from './profil-reprogrammation-panier/profil-reprogrammation-panier.component';
import { ProfilReprogrammationTypePanierComponent } from './profil-reprogrammation-type-panier/profil-reprogrammation-type-panier.component';
import { ProfilReprogrammationNombrePanierComponent } from './profil-reprogrammation-nombre-panier/profil-reprogrammation-nombre-panier.component';
import { StockProduitsComponent } from './stock-produits/stock-produits.component';
import { CommandeClientComponent } from './commande-client/commande-client.component';
import { FruitDeSaisonComponent } from './fruit-de-saison/fruit-de-saison.component';
import { LegumeDeSaisonComponent } from './legume-de-saison/legume-de-saison.component';
import { InscriptionAdminComponent } from './inscription-admin/inscription-admin.component';
import { PaiementAdminComponent } from './paiement-admin/paiement-admin.component';
import { FormulaireValidationComponent } from './formulaire-validation/formulaire-validation.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FaitsDiversComponent,
    AccueilAdherentComponent,
    LogoComponent,
    PanierComponent,
    DepotsComponent,
    LivraisonComponent,
    CalendrierLivraisonComponent,
    TrajetLivraisonComponent,
    ProfilAdherentComponent,
    FormulairePanierComponent,
    FormulaireCotisationComponent,
    FormulaireChoixComponent,
    FormulaireModeLivraisonComponent,
    FormulaireModePaiementComponent,
    FormulaireSemaineLivraisonComponent,
    FormulaireIbanComponent,
    ProfilModalAbonnementComponent,
    ProfilModalLivraisonComponent,
    ProfilModalHistoriquePaiementComponent,
    ProfilReprogrammationDateComponent,
    ProfilReprogrammationPanierComponent,
    ProfilReprogrammationTypePanierComponent,
    ProfilReprogrammationNombrePanierComponent,
    StockProduitsComponent,
    CommandeClientComponent,
    FruitDeSaisonComponent,
    LegumeDeSaisonComponent,
    InscriptionAdminComponent,
    PaiementAdminComponent,
    FormulaireValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        
    HttpClientModule,
    ReactiveFormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
