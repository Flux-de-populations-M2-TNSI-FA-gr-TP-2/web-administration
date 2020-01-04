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
  batiment_boss: any;
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
  icon_location_crud_close: string = 'close';
  boolean_close: boolean = true;
  suppression_salle: boolean = false;
  progressbar_delete_room: boolean = false;

  item_batiment : number;
  item_room : number;
  room_update: boolean = false;


  room_name_update_value : string;
  room_floor_update_value : string;

  progressbar_update_room: boolean = false;

  display_create_location_block: string = 'none';

  progressbar_create_location: boolean = false;
  display_crud_location_block: string = 'none';
  display_boolean_menu: boolean = true;
  boolean_details_location: boolean = false;
  etablissement_name: string = '';
  etablissement_adresse : string = '';

  boolean_close_batiment : boolean = true;
  suppression_batiment: boolean = false;
  progressbar_delete_batiment: boolean = false;

  batiment_item_boss: number;
  batiment_update: boolean = false;
  progressbar_update_batiment: boolean = false;
  batiment_name_update_value: any;
  batiment_adresse_update_value: any;

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
          console.log(this.batimentlist);
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
      .post(url,{'name': form.value['name_room'] , 'floor': form.value['floor_room'],'location_id': this.batiment.id},httpOptions)
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
          this.openSnackBar("Votre nouvelle salle vient d'être ajoutée avec succès !", "succès");
          return response;
        },
        (error) => {
          console.log(error);
          this.addroom_progressbar = false;
          this.addroom_display = 'none';
          this.openSnackBar("Une erreur réseau vient de se produire", "Erreur");
        }
      );
  }

  getEtablissementById(index) {
      this.batiment = this.batimentlist[index];
      this.index_room = index;
      this.addroom_display = 'block';
  }

  getSallesById( index_batiment, index_room) {
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
          this.openSnackBar("Votre suppression vient d'être éffectuée avec succès ! ", "succès");
          this.cancel_delete_room();
          return response;
        },
        (error) => {
          this.progressbar_delete_room = false;
          this.display_global_block = 'none';
          this.openSnackBar("Une erreur réseau vient de se produire !", "erreur");
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
          this.openSnackBar("Votre modification vient d'être éffectuée avec succès ! ", "succès");
          this.progressbar_update_room = false;
          this.batimentlist[this.item_batiment].rooms[this.item_room].name = this.room_name_update_value;
          this.batimentlist[this.item_batiment].rooms[this.item_room].floor = this.room_floor_update_value;
          this.display_global_block = 'none';
          this.cancel_delete_room();
          return response;
        },
        (error) => {
          this.openSnackBar("Une erreur réseau vient de se produire", "erreur");
          this.progressbar_update_room = false;
          this.display_global_block = 'none';
          this.cancel_delete_room();
          console.log(error);
        }
      );


  }


  closeCreateLocation() {
    this.display_create_location_block = 'none';
  }

  onaddLocation(form: NgForm) {
    const url = 'https://fluxtnsi.ddns.net/api/location/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    this.progressbar_create_location = true;
    this.httpClient
      .post(url,{'name': form.value['name_location_create'],
        'address': form.value['adresse_location_create'],
        'image': ''
      }, httpOptions)
      .subscribe(
        (response) => {
          let object : any;
          object = response;
          this.progressbar_create_location = false;
          this.batimentlist.push(object.data);
          this.openSnackBar("Votre batiment vient d'être ajoutée avec succès !", "succès");
          //console.log(response);
          /*this.utilisateurslists.push(object.user);*/
          this.closeCreateLocation();
          return response;
        },
        (error) => {
          this.progressbar_create_location = false;
          this.openSnackBar("Une erreur réseau vient de se produire", "erreur");
          console.log(error);
        }
      );


  }

  modalAddLocation() {
    this.display_create_location_block = 'block';
  }

  onDisplayCrudBlock(index) {
    //let batiment_boss : any;
    this.display_crud_location_block =  'block';
    this.batiment_boss = this.batimentlist[index];
    //console.log(this.batiment_boss);
    this.etablissement_name = this.batiment_boss.name;
    this.etablissement_adresse = this.batiment_boss.address;
    this.batiment_item_boss = index;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  OnClose_location_create_block() {
    if (this.boolean_close_batiment) {
      this.display_crud_location_block = 'none';
    } else {
      this.display_crud_location_block = 'block';
      this.icon_location_crud_close = 'close';
      this.display_boolean_menu = true;
      this.boolean_details_location = false;
      this.suppression_batiment = false;
      this.boolean_close_batiment = true;
      this.batiment_update = false;
    }
  }

  display_location_crud_details() {
    this.display_boolean_menu = false;
    this.boolean_details_location = true;
    this.icon_location_crud_close = 'arrow_back';
    this.boolean_close_batiment = false;
  }

  onsupprimer_location_crud_salle() {
    this.suppression_batiment = true;
    this.display_boolean_menu = false;
    this.suppression_batiment = true;
    this.icon_location_crud_close = 'arrow_back';
    this.boolean_close_batiment = false;
  }

  Update_location_crud_salle() {
    //this.suppression_batiment = true;
    this.display_boolean_menu = false;
    this.batiment_update = true;
    this.icon_location_crud_close = 'arrow_back';
    this.boolean_close_batiment = false;
    this.batiment_name_update_value = this.batiment_boss.name;
    this.batiment_adresse_update_value = this.batiment_boss.address;

  }

  cancel_delete_batiment_room() {
    this.display_crud_location_block = 'none';
    this.suppression_batiment = false;
    this.display_boolean_menu = true;
    this.suppression_batiment = false;
    this.icon_location_crud_close = 'close';
    this.boolean_close_batiment = true;
  }

  delete_batiment_room() {
    //this.batimentlist.splice(this.batiment_item_boss,1);
    const url = 'https://fluxtnsi.ddns.net/api/location/' + this.batiment_boss.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };
    this.progressbar_delete_batiment = true;

    /*console.log(this.batiment_boss);
    console.log(this.batiment_item_boss);*/
    this.httpClient
      .delete(url, httpOptions)
      .subscribe(
        (response) => {
          this.progressbar_delete_batiment = false;
          this.cancel_delete_batiment_room();
          this.batimentlist.splice(this.batiment_item_boss,1);
          this.openSnackBar("Votre batiment vient d'être supprimé avec succès !!", "succès!");

          return response;
        },
        (error) => {
          this.progressbar_delete_batiment = false;
          this.cancel_delete_batiment_room();
          this.openSnackBar("Une erreur réseau vient de se produire !!", "erreur");
        }
      );

  }

  Submit_Update_batiment() {
    const url = 'https://fluxtnsi.ddns.net/api/location/' + this.batiment_boss.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };
    this.progressbar_update_batiment = true;
    this.batiment_update = false;

    //console.log(this.batiment_boss);

    this.batiment_boss.name = this.batiment_name_update_value;
    this.batiment_boss.address = this.batiment_adresse_update_value;

    this.httpClient
      .put(url, this.batiment_boss, httpOptions)
      .subscribe(
        (response) => {
          this.batimentlist[this.batiment_item_boss].name = this.batiment_name_update_value;
          this.batimentlist[this.batiment_item_boss].address = this.batiment_adresse_update_value;
          this.progressbar_update_batiment = false;
          this.batiment_update = false;
          this.cancel_delete_batiment_room();
          this.openSnackBar("Votre batiment vient d'être modifié avec succès !!", "succès!");

          return response;
        },
        (error) => {
        }
      );


  }

}
