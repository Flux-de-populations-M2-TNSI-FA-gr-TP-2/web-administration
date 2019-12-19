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
  batiment: any;
  index_room: any;
  addroom_display: string = 'none';
  addroom_progressbar: boolean = false;


  constructor(private constance: ConstService
    , private httpClient: HttpClient
    , private authService: AuthService) { }

  ngOnInit() {
    this.addroom_display = 'none';
    this.addroom_progressbar = false;
    this.getListebatiment();
  }


  getListebatiment() {
    //this.addroom_display = 'block';
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
    this.addroom_progressbar = true;
    const url = 'https://fluxtnsi.ddns.net/api/room/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.httpClient
      .post(url,{ 'name': form.value['name_room'] , 'floor': form.value['floor_room'],'location_id': this.batiment.id},httpOptions)
      .subscribe(
        (response) => {
          let object : any;
          /*object['id'] = 0;
          object['name'] = this.batiment.name;
          object['location_id'] = this.batiment.id;*/
          object = response;
          this.batimentlist[this.index_room].rooms.push(object.data);
          this.addroom_progressbar = false;
          this.addroom_display = 'none';
          //console.log(response);
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getEtablissementById(index) {
      this.batiment = this.batimentlist[index];
      this.index_room = index;
      this.addroom_display = 'block';
     //console.log(this.batiment);
  }

  OnClose() {
    this.addroom_display = 'none';
  }

}
