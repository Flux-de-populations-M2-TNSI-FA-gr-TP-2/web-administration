import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import {MatSnackBar} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {

  ourObject : any;
  evenements : any;
  //var for evenement

  evenementName = "";
  evenementStart = "";
  evenementEnd = "";
  evenementStatus = "";
  evenementGroupeName = "";

  //name for datePicker
  datepickerStart = "Date de debut";
  datepickerEnd = "Date de fin";

  progressbar_display_evenement : boolean = true;
  progressbar_create_event : boolean = false;
  display_add_event_block : string = 'none';
  display_delete_event_block : string = 'none';

  constructor(private constance: ConstService
              , private httpClient: HttpClient
              , public snackBar: MatSnackBar
              , private authService: AuthService) { }

  ngOnInit() {
    this.getListEvent();
    this.constance.value_datePicker='';
  }

  getEvenementById(index) {
    let evenement = this.evenements[index];
    let i = 0;

    this.evenementName = evenement.name
    this.evenementEnd = evenement.end
    this.evenementStart = evenement.start
    this.evenementStatus = evenement.status
    evenement.event_groups.forEach(element => {
      if (i === 0) {
        this.evenementGroupeName = element.name
      } else {
        this.evenementGroupeName += ", " + element.name
      }
    });

  }

   getListEvent() {
    //console.log(this.authService.sessions.access_token);
    const url = 'https://fluxtnsi.ddns.net/api/event';

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
          this.ourObject = response;
          this.evenements = this.ourObject.data;
          this.progressbar_display_evenement = false;
          console.log(this.evenements);
          //console.log(this.evenements);
          return response;
        },
        (error) => {
          this.openSnackBar("Une erreur réseau vient de se produire !!", "erreur");
        }
      );
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  modaladdEvent() {
    this.display_add_event_block = 'block';
  }

  CloseEventAdd() {
    this.display_add_event_block = 'none';
  }

  onaddEvent(form: NgForm) {

    const url = 'https://fluxtnsi.ddns.net/api/event/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    let annee_begin_temp : any;
    let annee_begin_finale : any;
    annee_begin_temp = form.value['date_debut_create'];
    annee_begin_finale = annee_begin_temp.year+"-"+annee_begin_temp.month+"-"+annee_begin_temp.day;
    let annee_end_temp : any;
    let annee_end_finale : any;
    annee_end_temp = form.value['date_de_fin_create'];
    annee_end_finale = annee_end_temp.year+"-"+annee_end_temp.month+"-"+annee_end_temp.day;

    this.progressbar_create_event = true;

    this.httpClient
      .post(url,{'name': form.value['evenement_name_create'],
        'start': annee_begin_finale,
        'end': annee_end_finale,
        'status': form.value['evenement_status_create'],
        'groups': [form.value['evenement_group_name_create']],
        'locations': [0]
      }, httpOptions)
      .subscribe(
        (response) => {
          this.display_add_event_block = 'none';
          this.progressbar_create_event = false;
          let object : any;
          object = response;
          this.evenements.push(object.data);
          this.openSnackBar("Votre évenement vient d'être ajouter avec succès !!", "succès");
          return response;
        },
        (error) => {
          this.openSnackBar("Une erreur réseau vient de se produire !!", "erreur");
        }
      );


  }

}


