import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { EtablissementsComponent } from './etablissements/etablissements.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { MonitoringComponent } from './monitoring/monitoring.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: '', component: ConnexionComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'monitor', component: MonitoringComponent},
  {path: 'etablissements', component: EtablissementsComponent},
  {path: 'utilisateurs', component: UtilisateursComponent},
  {path: 'evenements', component: EvenementsComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NotFoundComponent,
    HomeComponent,
    MenuComponent,
    EtablissementsComponent,
    EvenementsComponent,
    UtilisateursComponent,
    MonitoringComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
