import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {BreadcrumbsComponent} from "./shared/breadcrumbs/breadcrumbs.component";
import {FooterComponent} from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, SidebarComponent, BreadcrumbsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoFinalJunical';
}
