import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


import { ModalComponent } from './component/modal/modal.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HeaderComponent } from './component/header/header.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ProfileImgComponent } from './component/profile-img/profile-img.component';
import { LogoComponent } from './component/logo/logo.component';


@NgModule({
  declarations: [ModalComponent, NavbarComponent, HeaderComponent, UserListComponent, ProfileImgComponent, LogoComponent,],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    NavbarComponent,
    HeaderComponent,
    UserListComponent,
    ProfileImgComponent,
    LogoComponent,
  ]
})
export class SharedModule { }
