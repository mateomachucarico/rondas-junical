import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../Entorno/entornos";

interface Usuario {
  id: number;
  userName: string;
}
interface Torre {
  id: number;
  torreName: string;

}
interface Piso {
  id: number;
  pisoName: string;

}
interface Area {
  id: number;
  areaName: string;

}
interface Zona {
  id: number;
  zonaName: string;

}
interface Categoria{
  id: number;
  categName: string;

}
interface ResponJefeArea {
  id: number;
  responName: string;

}
interface Ronda{
  id: number;
  usuario: Usuario;
  torre: Torre;
  piso: Piso;
  area: Area;
  zona: Zona;
  categoria: Categoria;
  responJefeArea: ResponJefeArea;
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
    return this.http.post<Ronda>(`${this.baseUrl}/rondas/guardarRonda`, ronda)
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
  //Parametrizacion

  //Obtener Torres
  recuperarTodosTorres(): Observable<Torre[]> {
    return this.http.get<Torre[]>(`${this.baseUrl}/torres/obtenerTodosLosTorres`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Pisos
  recuperarTodosPisos(): Observable<Piso[]> {
    return this.http.get<Piso[]>(`${this.baseUrl}/pisos/obtenerTodosLosPisos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Areas
  recuperarTodosAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.baseUrl}/areas/obtenerTodosLosAreas`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Zonas
  recuperarTodosZonas(): Observable<Zona[]>{
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas/obtenerTodosLosZonas`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Categoria
  recuperarTodosCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categSopor/obtenerTodosLosCategSopors`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener ResponJefeArea
  recuperarTodosResponJefeAreas(): Observable<ResponJefeArea[]>{
    return this.http.get<ResponJefeArea[]>(`${this.baseUrl}/responJefeAreas/obtenerTodosLosResponJefeArea`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Usuarios Responsables del Soporte
  recuperarTodosLosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/obtenerTodosLosUsuarios`)
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
