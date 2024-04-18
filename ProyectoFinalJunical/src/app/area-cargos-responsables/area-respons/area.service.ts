import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";


interface Area {
  id: number;
  areaName: string;
  //areaDescripc: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;

}
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api/areas`;  //Url Base API
  constructor(private http: HttpClient) {

  }
  // Function para guardar nueva área
  guardarArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/areas/guardarArea`, area)
      .pipe(
        catchError(this.handleError)
      );
  }
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
