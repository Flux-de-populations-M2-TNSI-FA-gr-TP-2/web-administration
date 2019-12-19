import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
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
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';


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
    ListeutilisateursComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDividerModule,
    HttpClientModule,
    NgbModule
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
