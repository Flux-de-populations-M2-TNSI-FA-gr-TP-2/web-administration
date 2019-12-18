import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss']
})
export class EtablissementsComponent implements OnInit {

  ourobject: any;
  batimentlist: any;
  progressbar_display_establishment: boolean = false;

  constructor(private constance: ConstService
    , private httpClient: HttpClient
    , private authService: AuthService) { }

  ngOnInit() {
    this.getListebatiment();
  }


  getListebatiment() {

    const url = 'https://fluxtnsi.ddns.net/api/location';
    this.progressbar_display_establishment = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.httpClient
      .get(url, httpOptions)
      .subscribe(
        (response) => {
          this.progressbar_display_establishment = false;
          this.ourobject = response;
          this.batimentlist = this.ourobject.data;
          //console.log(this.utilisateurslists);
          console.log(response);
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addRoom(form: NgForm) {

  }

}
