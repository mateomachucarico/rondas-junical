import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  // Variable para controlar el estado de la barra lateral
  isMenuOpen: boolean = false;
  ngOnInit(): void {

  }

  // Implementar la lógica para mostrar/ocultar la barra lateral
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

}
