import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../models/person";
import {Content} from "../models/content";
import {LoginFormDTO} from "../models/login-form-dto";
import {Router} from "@angular/router";
import {utf8Encode} from "@angular/compiler/src/util";
import {stripBom} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/strip-bom";
import {Role} from "../models/role";
import {RoleDTO} from "../models/role-dto";
import {IsUserExistsDTO} from "../models/isUserExistsDTO";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private authenticateUrl = "http://localhost:8080/authenticate";
  private adminDeleteContentUrl = "http://localhost:8080/Admin/deleteContentByID/";
  private adminDeleteUserUrl= "http://localhost:8080/Admin/deleteUserByUserName/";
  private adminHomeUrl= "http://localhost:8080/Admin/Home";
  private userHomeUrl= "http://localhost:8080/User/Home";
  private userCreateContentUrl= "http://localhost:8080/User/createContent";
  private userDeleteContentUrl = "http://localhost:8080/User/deleteContentByID/";
  constructor(private  http:HttpClient,public router: Router) { }
  private createHeader(dto:LoginFormDTO) :HttpHeaders{
    return new HttpHeaders({"Content-Type":"application/json",Authorization :'Basic '+btoa(dto.username+':'+dto.password)});
  }
  dto:LoginFormDTO={
    username:"",
    password:""
  };
  isExistsDTO:IsUserExistsDTO={
    isExsists:true
  }
  role:string = "";
  getAdminHomePage() : Observable<Person>{
    return this.http.get<Person>(this.adminHomeUrl,{headers:this.createHeader(this.dto)});
  }
  getUserHomePage() : Observable<Person>{
    return this.http.get<Person>(this.userHomeUrl,{headers:this.createHeader(this.dto)});
  }
  deleteUserByUsername(username:string){

      this.http.delete(this.adminDeleteUserUrl + username, {headers: this.createHeader(this.dto)}).subscribe(
        res => {
          alert("Deleted.");
        },
        error => {
          alert("An error has occured");
        }
      );

  }
  deleteContentByIdByAdmin(content_id:number){

      this.http.delete<IsUserExistsDTO>(this.adminDeleteContentUrl + content_id, {headers: this.createHeader(this.dto)}).subscribe(
        res => {
          alert("Deleted.");
          this.isExistsDTO = res;



        },
        error => {
          alert("An error has occured");
        }
      );

  }
  deleteContentByIdByUser(content_id:number){

      this.http.delete<IsUserExistsDTO>(this.userDeleteContentUrl + content_id, {headers: this.createHeader(this.dto)}).subscribe(
        res => {
          alert("Deleted.");
          this.isExistsDTO = res;

        },
        error => {
          alert("An error has occured");
        }
      );

  }
  createContent(content:Content){
    this.http.put(this.userCreateContentUrl,content,{headers:this.createHeader(this.dto)}).subscribe(
      res=>{
        alert("Succesful.");
      },
      error => {
        alert("An error has occured");
      }
    );
  }
  authenticate(dto:LoginFormDTO):Observable<RoleDTO>{

    return this.http.get<RoleDTO>(this.authenticateUrl,{headers:this.createHeader(dto),responseType:"json",});
  }
  login(dto:LoginFormDTO,role:string){
    this.role= role;
    this.dto.password = dto.password;
    this.dto.username = dto.username;
    if (this.role=="ROLE_ADMIN"){

      this.router.navigateByUrl('/admin');

    }
    else if(this.role =="ROLE_USER"){

      this.router.navigateByUrl('/user');

    }
  }
  check(){
    if(this.dto.username==""){
      this.logout();
    }
  }
  logout(){
    this.dto.username="";
    this.dto.password="";
    this.router.navigateByUrl('/login');
  }

}
