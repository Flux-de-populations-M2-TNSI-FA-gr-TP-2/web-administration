import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: '', component: ConnexionComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
