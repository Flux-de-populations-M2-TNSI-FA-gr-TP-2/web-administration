import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

   utilisateurslists: any;
   ourobject:any;

  constructor(private constance: ConstService
    , private httpClient: HttpClient
    , private authService: AuthService) { }

  ngOnInit() {
    this.getListeUtilisateurs();
  }

  getListeUtilisateurs() {
    const url = 'https://fluxtnsi.ddns.net/api/user';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.httpClient
      .get(url,httpOptions)
      .subscribe(
        (response) => {
          this.ourobject = response;
          this.utilisateurslists = this.ourobject.data;
          console.log(this.utilisateurslists);
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
