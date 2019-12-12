import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  error: boolean = false;
  constructor(private  router: Router) { }
   
  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    /*this.afficher_spinner = true;
    const email = form.value['email'];
    const password = form.value['password'];
    const url = this.constance.dns.concat('/api/connexion?email=').concat(email).concat('&password=').concat(password);
    this.connexionToServer(url);*/
  }

}
