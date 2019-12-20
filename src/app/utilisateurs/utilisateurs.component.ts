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
  display_details_user_block: string = 'none';
  progressbar_create_user: boolean = false;

  details_firstname:string = '';
  details_lastname: string = '';
  details_email: string = '';
  details_password: string = '';
  details_birthday: string = '';
  details_role: string = '';
  display_delete_user_block: string = 'none';
  delete_user: boolean = false;
  user_index: number;



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

  DetailsUser(index) {
    this.display_details_user_block = 'block';
    this.details_firstname = this.utilisateurslists[index].firstname;
    this.details_lastname = this.utilisateurslists[index].lastname;
    this.details_email = this.utilisateurslists[index].email;
    this.details_password = this.utilisateurslists[index].password;
    this.details_birthday = this.utilisateurslists[index].birthdate;
    this.details_role  = this.utilisateurslists[index].role;
  }

  closeDetailsUser() {
    this.display_details_user_block = 'none';
  }

  onSupprimeUser(index) {
    this.display_delete_user_block = 'block';
    this.user_index = index;
  }

  cancel_user() {
    this.display_delete_user_block = 'none';
  }

  deleteUser(index) {
    const url = 'https://fluxtnsi.ddns.net/api/user/' + this.utilisateurslists[ this.user_index].id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.sessions.access_token
      })
    };
    this.delete_user = true;

    this.httpClient
      .delete(url, httpOptions)
      .subscribe(
        (response) => {
          this.utilisateurslists.splice(this.user_index, 1);
          this.delete_user = false;
          this.display_delete_user_block = 'none';
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  closeDeleteUser() {
    this.display_delete_user_block = 'none';

  }

}
