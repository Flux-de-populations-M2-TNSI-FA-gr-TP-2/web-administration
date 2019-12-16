import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { EtablissementsComponent } from './etablissements/etablissements.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import {FormsModule} from '@angular/forms';
import {ConstService} from './service/Const.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import {AuthGuardService} from './service/auth.guard.service';
import { ListeutilisateursComponent } from './listeutilisateurs/listeutilisateurs.component';


const appRoutes: Routes = [
  {path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: '', component: ConnexionComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'monitor', canActivate: [AuthGuardService], component: MonitoringComponent},
  {path: 'etablissements', canActivate: [AuthGuardService], component: EtablissementsComponent},
  {path: 'utilisateurs', canActivate: [AuthGuardService], component: UtilisateursComponent},
  {path: 'evenements', canActivate: [AuthGuardService], component: EvenementsComponent},
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
    MonitoringComponent,
    ListeutilisateursComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ConstService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
