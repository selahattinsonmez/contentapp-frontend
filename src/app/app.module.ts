import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { FooterComponent } from './footer/footer.component';
import { CreateContentComponent } from './create-content/create-content.component';


const appRoutes : Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LoginComponent,
    pathMatch:'full'

  },
  {
    path:'admin',
    component:AdminpageComponent
  },
  {
    path:'user',
    component:UserpageComponent
  },
  {
    path:'createContent',
    component:CreateContentComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AdminpageComponent,
    UserpageComponent,
    FooterComponent,
    CreateContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
