import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";



/*
interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}
interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
}
*/
interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  habilitado:boolean;
}
interface Area {
  id: number;
  areaName: string;
  //torre: Torre;
  //piso: Piso;
  responJefeArea: ResponJefeArea;
  habilitado: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API
  constructor(private http: HttpClient) {

  }
  // Function para guardar nueva área
  guardarArea(area: Area): Observable<Area>{
    return this.http.post<Area>(`${this.baseUrl}/areas/guardarArea`, area)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*
  guardarArea(area: {
    areaName: any;
    habilitado: boolean;
    responJefeArea: { responEmail: string; responName: string; id: any; habilitado: boolean }
  }): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/areas/guardarArea`, area)
      .pipe(
        catchError(this.handleError)
      );
  }
   */
  //Eliminar Area
  eliminarArea(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/areas/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas la Área
  recuperarTodosAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.baseUrl}/areas/obtenerTodosLosAreas`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Obtener Areas por I'd
  obtenerArea(id: number): Observable<Area>{
    return this.http.get<Area>(`${this.baseUrl}/areas/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actualizar un Area
  actualizarArea(id: number, areaActualizada: Area): Observable<Area>{
    areaActualizada.id=id;
    return this.http.put<Area>(`${this.baseUrl}/areas/${id}`, areaActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar Area
  inhabilitarArea(id: number): Observable<Area>{
    return this.http.put<void>(`${this.baseUrl}/areas/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar Area
  habilitarArea(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/areas/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  verificarAreaExistente(areaName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/areas/existe/${encodeURIComponent(areaName)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //recuperar todas las torres
  /*
  recuperarTodosTorres(): Observable<Torre[]>{
    return this.http.get<Torre[]>(`${this.baseUrl}/torres/obtenerTodosLosTorres`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //obtener todos los pisos
  recuperarTodosPisos(): Observable<Piso[]>{
    return this.http.get<Piso[]>(`${this.baseUrl}/pisos/obtenerTodosLosPisos`)
      .pipe(
        catchError(this.handleError)
      );
  }
   */
  //obtener jefe área responsable
  recuperarTodosResponJefeArea(): Observable<ResponJefeArea[]>{
    return this.http.get<ResponJefeArea[]>(`${this.baseUrl}/responJefeAreas/obtenerTodosLosResponJefeArea`)
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
