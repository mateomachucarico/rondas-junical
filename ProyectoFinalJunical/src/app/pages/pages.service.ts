import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API
  constructor(private  http: HttpClient) { }


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
