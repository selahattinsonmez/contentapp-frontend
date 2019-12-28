import { Component, OnInit } from '@angular/core';
import {Content} from "../models/content";
import {ApiService} from "../Shared/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {
  content:Content = {
    content_id:0,
    title:"",
    text:"",
    image:"",
    person_id:0
  };
  constructor(private apiService:ApiService,private router:Router) {
    apiService.check();
  }

  ngOnInit() {
  }
  createContent(){
    this.apiService.createContent(this.content);

    this.router.navigateByUrl("/user")
  }
}
