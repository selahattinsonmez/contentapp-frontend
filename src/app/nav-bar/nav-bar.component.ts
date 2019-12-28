import { Component, OnInit } from '@angular/core';
import {ApiService} from "../Shared/api.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }
  signOut(){
    this.apiService.logout()
  }

}
