import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "../Shared/api.service";
import {Person} from "../models/person";
import {Role} from "../models/role";
import {Content} from "../models/content";

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  private roles: Role[] = [];
  private persons:Person[] = [];
  private contents:Content[] =[];
  person:Person = {
    personId:0,
    username:"",
    password:"",
    roles:this.roles,
    persons:this.persons,
    contents:this.contents

  }

  private selectedRoles: Role[] = [];
  private selectedPersons:Person[] = [];
  private selectedContents:Content[] =[];
  selectedPerson:Person = {
    personId:0,
    username:"",
    password:"",
    roles:this.selectedRoles,
    persons:this.selectedPersons,
    contents:this.selectedContents

  }


  constructor(private apiService:ApiService,private changeDetector:ChangeDetectorRef) {
    apiService.check();
  }

  ngOnInit() {
    this.person = new Person();
    this.apiService.getAdminHomePage().subscribe(
      res=>{
        this.person = res;
      },
      error => {
        alert("An error has occured.")
      }
    )
  }
  deleteUser(person:Person){
    if(confirm("Are you sure?")) {
      this.apiService.deleteUserByUsername(person.username);
      this.person.persons.splice(this.person.persons.indexOf(person), 1);
      if (person.username == this.selectedPerson.username) {
        this.selectedPerson = new Person();
      }
    }
  }

  getUsersContents(person:Person){
    this.selectedPerson = person;

    this.changeDetector.detectChanges();

  }

  deleteContent(content: Content,length:number) {
    if (confirm("Are you sure?")) {
      this.selectedPerson.contents.splice(this.selectedPerson.contents.indexOf(content), 1);
      this.apiService.deleteContentByIdByAdmin(content.content_id);
      if (this.selectedPerson.contents.length == 0) {
        this.person.persons.splice(this.person.persons.indexOf(this.selectedPerson), 1);
      }
    }
  }
}
