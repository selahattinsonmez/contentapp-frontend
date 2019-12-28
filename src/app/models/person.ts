import {Role} from "./role";
import {Content} from "./content";


export class Person {
  personId:number;
  username:string;
  password:string;
  roles:Role[];
  contents:Content[];
  persons:Person[];
  constructor(){
    this.personId=0;
    this.username="";
    this.password = "";
    this.roles = [];
    this.contents=[];
    this.persons = [];

  }


}
