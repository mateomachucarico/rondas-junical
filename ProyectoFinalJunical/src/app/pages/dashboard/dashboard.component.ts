import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/header/header.component";
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {BreadcrumbsComponent} from "../../shared/breadcrumbs/breadcrumbs.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
