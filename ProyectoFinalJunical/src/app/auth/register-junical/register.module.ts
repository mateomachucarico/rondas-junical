import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {RegisterJunicalComponent} from "./register-junical.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterJunicalComponent,
    HttpClientModule,
  ]
})
export class RegisterModule { }
