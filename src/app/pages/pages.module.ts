import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [HomeComponent, CalendarComponent, LoginComponent, SignupComponent, PagesComponent,],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    CalendarComponent,
    PagesRoutingModule,
    SignupComponent,
    LoginComponent,

  ]
})
export class PagesModule { }