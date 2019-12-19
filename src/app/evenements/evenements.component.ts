import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

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

  constructor(private constance: ConstService
              , private httpClient: HttpClient
              , private authService: AuthService) { }

  ngOnInit() {
    this.getListEvent();
    this.constance.value_datePicker=''
  }

  getEvenementById(index){
    let evenement = this.evenements[index]
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
          //console.log(this.evenements);
          return response;
        },
        (error) => {
           console.log(error);
        }
      );
    }

}


