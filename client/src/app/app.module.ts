import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule pour les requêtes HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FaitsDiversComponent } from './faits-divers/faits-divers.component';
import { AccueilAdherentComponent } from './accueil-adherent/accueil-adherent.component';
import { LogoComponent } from './logo/logo.component';
import { PanierComponent } from './panier/panier.component';
import { DepotsComponent } from './depots/depots.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FaitsDiversComponent,
    AccueilAdherentComponent,
    LogoComponent,
    PanierComponent,
    DepotsComponent
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
