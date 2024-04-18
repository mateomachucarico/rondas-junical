import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../Entorno/entornos";

interface Torre {
  id: number;
  torreName: string;
  [key: string]: boolean | number | string;
}
interface Piso {
  id: number;
  pisoName: string;
  [key: string]: boolean | number | string;
}
interface Area {
  id: number;
  areaName: string;
  [key: string]: boolean | number | string;
}
interface Zona {
  id: number;
  zonaName: string;
  [key: string]: boolean | number | string;
}
interface Ronda{
  id: number;
  rondaFecha: string;
  rondaHoraInicio: string;
  rondaHoraFin: string;
  rondaDescrip: string;
  rondaPrioridad: string;
  rondaFoto: string;
  rondaCorrectivo: string;
  rondaSolucion: boolean;
  rondaNoSolucion: string;

}
@Injectable({
  providedIn: 'root'
})
export class RondaService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  //Guardar la ronda final
  guardarRondaFinal(ronda: Ronda): Observable<Ronda> {
    return this.http.post<Ronda>(`${this.baseUrl}/rondas/guardarArea`, ronda)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas las rondas finales
  recuperarTodosRondaFinales(): Observable<Ronda[]>{
    return this.http.get<Ronda[]>(`${this.baseUrl}/rondas/obtenerTodosLosRondaFinales`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar rondas finales por ID
  obtenerRondaFinal(id: number): Observable<Ronda>{
    return this.http.get<Ronda>(`${this.baseUrl}/rondas/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }





  // Function para manejar errores de HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido';
    if (error && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error?.status || 0}, mensaje: ${error?.error?.message || 'No hay mensaje disponible'}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
