import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardComponent,
    PagesComponent,
    RouterModule,
    SharedModule

  ],
  exports:[
    DashboardComponent,

  ]
})
export class PagesModule { }
