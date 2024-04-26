import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

interface Area {
  id: number;
  areaName: string;
  habilitado: boolean;
}
interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
}
interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}
interface Zona {
  id: number;
  zonaName: string;
  torre: Torre;
  piso: Piso;
  area: Area;
  habilitado: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API
  constructor(private http: HttpClient) {

  }
  // Nuevo registro de Zona
  guardarZona(zona: Zona): Observable<Zona> {
    return this.http.post<Zona>(`${this.baseUrl}/zonas/guardarZona`, zona)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar zona por Id
  eliminarZona(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/zonas/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar zona por Id
  inhabilitarZona(id: number): Observable<Zona>{
    return this.http.put<void>(`${this.baseUrl}/zonas/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar zonas
  habilitarZona(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/zonas/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
//Recuperar las zonas
  recuperarTodosZonas(): Observable<Zona[]>{
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas/obtenerTodosLosZonas`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas las torres
  recuperarTodosTorres(): Observable<Torre[]>{
    return this.http.get<Torre[]>(`${this.baseUrl}/torres/obtenerTodosLosTorres`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas las piso
  recuperarTodosPisos(): Observable<Piso[]>{
    return this.http.get<Piso[]>(`${this.baseUrl}/pisos/obtenerTodosLosPisos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas la área
  recuperarTodosAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.baseUrl}/areas/obtenerTodosLosAreas`)
      .pipe(
        catchError(this.handleError)
      );
  }


  //Obtener zona por Id
  obtenerZona(id: number): Observable<Zona>{
    return  this.http.get<Zona>(`${this.baseUrl}/zonas/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actualizar zona
  actualizarZona(id: number, zonaActualizada: Zona): Observable<Zona>{
    zonaActualizada.id=id;
    return this.http.put<Zona>(`${this.baseUrl}/zonas/${id}`, zonaActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si exisate en la base de datos
  verificarZonaExistente(zonaName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/zonas/existe/${encodeURIComponent(zonaName)}`)
      .pipe(
        catchError(this.handleError)
      );
  }


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
