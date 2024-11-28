import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
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
    FormulaireSemaineLivraisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        
    HttpClientModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
