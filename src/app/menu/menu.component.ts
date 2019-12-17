import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {ConstService} from '../service/Const.service';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  DeconnectResponse: any;
  succes: any;

  constructor(private  router: Router
              , private constance: ConstService
              , private httpClient: HttpClient
              , public snackBar: MatSnackBar
              , private authService: AuthService) { }

  ngOnInit() {

  }

  RootEvenements() {
    this.ActiveMenuItem('evenements');
    this.router.navigate(['evenements']);
  }

  RootToUtilisateurs() {
    this.ActiveMenuItem('utilisateurs');
    this.router.navigate(['utilisateurs']);
  }

  RootToEtablissements() {
    this.ActiveMenuItem('etablissements');
    this.router.navigate(['etablissements']);
  }

  RootToMonitoring() {
    this.ActiveMenuItem('monitor');
    this.router.navigate(['monitor']);
  }

  RootToHome() {
    this.ActiveMenuItem('home');
    this.router.navigate(['home']);
  }

  Disconnect() {
    this.constance.progressbar_deconnexion = true;
    this.DisconnectWebService();
    /*this.authService.signOut();*/
    /*this.router.navigate(['connexion']);*/
  }

  ActiveMenuItem(what: String) {
    this.constance.active_evenement = '';
    this.constance.active_monitoring = '';
    this.constance.active_evenement = '';
    this.constance.active_utilisateur = '';
    this.constance.active_etablissement = '';
    if (what == 'etablissements') {
      this.constance.active_etablissement = 'active';
    } else if (what == 'evenements') {
      this.constance.active_evenement = 'active';
    } else if (what == 'monitor' || what == 'home') {
      this.constance.active_monitoring = 'active';
    } else if (what == 'utilisateurs') {
      this.constance.active_utilisateur = 'active';
    }
  }


  DisconnectWebService() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    const url = 'https://fluxtnsi.ddns.net/api/user/logout';
    this.httpClient
      .get(url, httpOptions)
      .subscribe(
        (response) => {
          this.DeconnectResponse = response;
          if (this.DeconnectResponse.success) {
            this.authService.signOut();
            this.openSnackBar("Votre déconnexion s'est éffectuer avec succès !!", "succes");
            this.constance.progressbar_deconnexion = false;
            this.router.navigate(['connexion']);
          }
          return response;
        },
        (error) => {
          this.openSnackBar("Une erreur réseau vient de se produire !!", "erreur");
          this.constance.progressbar_deconnexion = false;
        }
      );
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
