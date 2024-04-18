import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

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
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api/notificaciones`;  //Url Base API

  constructor(
    private http: HttpClient
  ) { }




  // Funcion para manejar errores de HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
