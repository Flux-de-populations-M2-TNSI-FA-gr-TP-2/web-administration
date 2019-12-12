import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  error: boolean = false;
  email_value: String = '';
  password_value: String = '';
  logForm: FormGroup;

  constructor(private  router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      Email: ['', Validators.required],
      firstNpassword: ['', Validators.required]
    });
  }



  onSubmit() {
    console.log(this.email_value);
    console.log(this.password_value);
  }

}
