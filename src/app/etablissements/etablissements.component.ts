import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

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
  display_global_block: string = 'none';
  addroom_progressbar: boolean = false;

  room_name: string = '';
  room_floor: string = '';
  room_establissement: string = '';
  boolean_room_details: boolean = false;
  boolean_menu_display: boolean = true;
  room_id : number;

  icon_close : string = 'close';
  boolean_close: boolean = true;
  suppression_salle: boolean = false;
  progressbar_delete_room: boolean = false;

  item_batiment : number;
  item_room : number;
  room_update: boolean = false;


  room_name_update_value : string;
  room_floor_update_value : string;

  progressbar_update_room: boolean = false;


  constructor(private constance: ConstService
    , public snackBar: MatSnackBar
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

  getSallesById( index_batiment, index_room) {
    /*console.log(index_batiment);
    console.log(index_room);*/
    this.item_batiment = index_batiment;
    this.item_room = index_room;
    this.display_global_block = 'block';
    this.room_name = this.batimentlist[index_batiment].rooms[index_room].name;
    this.room_floor = this.batimentlist[index_batiment].rooms[index_room].floor;
    this.room_name_update_value = this.batimentlist[index_batiment].rooms[index_room].name;
    this.room_floor_update_value = this.batimentlist[index_batiment].rooms[index_room].floor;
    this.room_establissement = this.batimentlist[index_batiment].name;
    this.room_id = this.batimentlist[index_batiment].rooms[index_room].id;

  }

  OnClose() {
    this.addroom_display = 'none';
  }

  OnClose_globale_block() {
    //si le block à le bouton close
    if (this.boolean_close) {
      this.display_global_block = 'none';
    }
    //si le block à le bouton back
    else {
      this.icon_close = 'close';
      this.boolean_menu_display = true;
      this.boolean_room_details = false;
      this.boolean_close = true;
      this.suppression_salle = false;
      this.room_update = false;
    }
  }

  display_details() {
    this.boolean_menu_display = false;
    this.boolean_room_details = true;
    this.icon_close = 'arrow_back';
    this.boolean_close = false;
  }

  onsupprimer_salle() {
    this.boolean_menu_display = false;
    this.icon_close = 'arrow_back';
    this.boolean_close = false;
    this.suppression_salle = true;
    this.progressbar_delete_room = false;
  }

  cancel_delete_room() {
    this.icon_close = 'close';
    this.boolean_menu_display = true;
    this.boolean_room_details = false;
    this.boolean_close = true;
    this.suppression_salle = false;
    this.room_update = false;
  }

  delete_room() {
    this.progressbar_delete_room = true;
    const url = 'https://fluxtnsi.ddns.net/api/room/' + this.room_id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };


    this.httpClient
      .delete(url, httpOptions)
      .subscribe(
        (response) => {
          this.progressbar_delete_room = false;
          this.display_global_block = 'none';
          this.batimentlist[this.item_batiment].rooms.splice(this.item_room,1);
          this.cancel_delete_room();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  Update_salle() {
    this.boolean_menu_display = false;
    this.icon_close = 'arrow_back';
    this.boolean_close = false;
    this.suppression_salle = false;
    this.progressbar_delete_room = false;
    this.boolean_room_details = false;
    this.room_update = true;
  }

  Submit_Update_salle() {
      console.log("N° : "+this.room_floor_update_value);
      console.log("Nom : "+this.room_name_update_value);
      this.progressbar_update_room = true;
      this.room_update = false;

    const url = 'https://fluxtnsi.ddns.net/api/room/' + this.room_id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };


    this.httpClient
      .put(url, { 'name': this.room_name_update_value , 'floor': this.room_floor_update_value,'location_id': this.batimentlist[this.item_batiment].id}, httpOptions)
      .subscribe(
        (response) => {
          /*this.progressbar_delete_room = false;
          this.display_global_block = 'none';
          this.batimentlist[this.item_batiment].rooms.splice(this.item_room,1);*/
          this.progressbar_update_room = false;
          this.batimentlist[this.item_batiment].rooms[this.item_room].name = this.room_name_update_value;
          this.batimentlist[this.item_batiment].rooms[this.item_room].floor = this.room_floor_update_value;
          this.display_global_block = 'none';
          this.cancel_delete_room();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );


  }

}
