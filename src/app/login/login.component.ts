import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {ApiService} from "../Shared/api.service";
import {LoginFormDTO} from "../models/login-form-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dto:LoginFormDTO = {
    username:'',
    password:''
  };
  constructor(private apiService:ApiService) {

  }

  ngOnInit() {

  }
  login(){
    this.apiService.authenticate(this.dto).subscribe(
      res=>{
        this.apiService.login(this.dto,res.role);
      },
      error => {
        alert("An error has occured.I hope it is because of wrong password :)")
      }
    )

  }

};



