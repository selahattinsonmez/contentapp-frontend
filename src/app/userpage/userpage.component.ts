import { Component, OnInit } from '@angular/core';
import {ApiService} from "../Shared/api.service";
import {Role} from "../models/role";
import {Person} from "../models/person";
import {Content} from "../models/content";

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor(private apiService:ApiService) {
    apiService.check();
  }
  private roles: Role[] = [];
  private persons:Person[] = [];
  private contents:Content[] = [];
  person:Person=new Person()

  ngOnInit() {
    this.apiService.getUserHomePage().subscribe(
      res=>{
        this.contents = res.contents;
        this.person = res;


      }
      ,error => {
        alert("An error has occured.")
      }
    )
  }

  deleteContent(content: Content) {
    if(confirm("Are you sure?")) {
      this.apiService.deleteContentByIdByUser(content.content_id);
      this.person.contents.splice(this.person.contents.indexOf(content), 1);
      if (this.person.contents.length == 0) {
        this.apiService.logout();
      }
    }
  }
}
