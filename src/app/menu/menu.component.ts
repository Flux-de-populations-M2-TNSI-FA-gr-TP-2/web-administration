import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {ConstService} from '../service/Const.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {



  constructor(private  router: Router
              , private constance: ConstService
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
    this.authService.signOut();
    this.router.navigate(['connexion']);
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
}
