import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    RouterModule
  ]
})
export class SharedModule { }
