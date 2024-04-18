import { Component } from '@angular/core';
import {BreadcrumbsComponent} from "../shared/breadcrumbs/breadcrumbs.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {HeaderComponent} from "../shared/header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-pages',
  standalone: true,
    imports: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent
    ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
