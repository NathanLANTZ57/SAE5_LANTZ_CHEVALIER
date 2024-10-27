import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { LogoComponent } from './logo/logo.component';
import { FormulaireAdherentInfoComponent } from './formulaire-adherent-info/formulaire-adherent-info.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { CalendrierLivraisonComponent } from './calendrier-livraison/calendrier-livraison.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FaitsDiversComponent,
    AccueilAdherentComponent,
    LogoComponent,
    FormulaireAdherentInfoComponent,
    LivraisonComponent,
    CalendrierLivraisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
