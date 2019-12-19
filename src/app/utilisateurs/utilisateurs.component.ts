import { Component, OnInit } from '@angular/core';
import {ConstService} from '../service/Const.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

   utilisateurslists: any;
    //progressbar_display_utilisateur: boolean = false;
    //datepicker libelle
    datepicker_birth="Date de naissance";
   ourobject: any;
   progressbar_display_utilisateur : boolean = true;
   display_create_user_block: string = 'none';
  progressbar_create_user: boolean = false;



  constructor(private constance: ConstService
    , private httpClient: HttpClient
    , private authService: AuthService) { }

  ngOnInit() {
    this.getListeUtilisateurs();
  }

  getListeUtilisateurs() {
    const url = 'https://fluxtnsi.ddns.net/api/user';
    this.progressbar_display_utilisateur = true;

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
          this.ourobject = response;
          console.log(this.ourobject);
          this.utilisateurslists = this.ourobject.data;
          this.progressbar_display_utilisateur = false;
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onUpdate(form: NgForm) {

  }

  onaddUser(form: NgForm) {
    const url = 'https://fluxtnsi.ddns.net/api/user/register';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };

    //console.log(form.value['birdthday_create'].day + "-" + form.value['birdthday_create'].month + "-" + form.value['birdthday_create'].year);

    /*const lastname = form.value['lastname_create'];
    const  firstname = form.value['firstname_create'];
    const email = form.value['email_create'];
    const birthday = form.value['birthdate_create'];
    const role = form.value['role_create'];
    const password = form.value['password_create'];*/

    this.progressbar_create_user = true;
    this.httpClient
      .post(url,{'lastname': form.value['lastname_create'],
        'firstname': form.value['firstname_create'],
        'email': form.value['email_create'],
        'password': form.value['password_create'],
        'password_confirm': form.value['password_create'],
        'birthdate': form.value['birdthday_create'].day + "-" + form.value['birdthday_create'].month + "-" + form.value['birdthday_create'].year,
        'loginAfterRegister': true,
        'role': form.value['role_create'],
        'Enum': [ 'user', 'admin' ]
      }, httpOptions)
      .subscribe(
        (response) => {
          let object : any;
          object = response;
          this.progressbar_create_user = false;
          this.utilisateurslists.push(object.user);
          this.closeCreateUser();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  // get utilisateur by ID
  getUserById(index) {

  }

  modalAddUser() {
    this.display_create_user_block = 'block';
  }

  closeCreateUser() {
    this.display_create_user_block = 'none';
  }

}
