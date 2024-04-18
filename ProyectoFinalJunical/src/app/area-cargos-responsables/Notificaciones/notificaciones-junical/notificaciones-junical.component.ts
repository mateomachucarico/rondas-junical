import {Component, OnInit} from '@angular/core';
import {NotificacionesService} from "../notificaciones.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, KeyValuePipe, NgForOf, NgIf} from "@angular/common";

interface Notificacion {
  id: number;
  tituloNotificacion: string;
  mensajeNotificacion: string;
  tipoNotificacion: string;
  fechaCreac: Date;
  fechaProgram: Date;
  horaCreacion: Date;
  visto: boolean;
  [key: string]: boolean | number | string | Date;
}
@Component({
  providers: [NotificacionesService, HttpClient],
  selector: 'app-notificaciones-junical',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf,
    CommonModule,
  ],
  templateUrl: './notificaciones-junical.component.html',
  styleUrl: './notificaciones-junical.component.css'
})
export class NotificacionesJunicalComponent implements OnInit {


  constructor(
    private router: Router,
    private http: HttpClient,
    private notificacionesService: NotificacionesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
