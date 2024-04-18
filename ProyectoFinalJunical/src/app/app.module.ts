import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {NopageFoundComponent} from "./errores/nopage-found/nopage-found.component";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import {PagesModule} from "./pages/pages.module";
import {routes} from "./app.routes";
//import {CrearondasJunicalComponent} from "./crearondas-junical/crearondas-junical.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [


  ],
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    PagesModule,
    //CrearondasJunicalComponent,
    HttpClientModule,
    CommonModule,
    AppComponent,
    NopageFoundComponent,

  ],
  exports: [RouterModule]
})
export class AppModule { }
