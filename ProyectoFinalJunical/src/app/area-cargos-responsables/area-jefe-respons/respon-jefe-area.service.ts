import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  habilitado:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResponJefeAreaService {

  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) { }

  // Nuevo registro de responsable jefe del área
  guardarResponJefeArea(responJefeArea: ResponJefeArea): Observable<ResponJefeArea> {
    return this.http.post<ResponJefeArea>(`${this.baseUrl}/responJefeAreas/guardarResponJefeArea`, responJefeArea)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar Jefe
  eliminarResponJefeArea(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/responJefeAreas/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todos los jefes
  recuperarTodosResponJefeAreas(): Observable<ResponJefeArea[]>{
    return this.http.get<ResponJefeArea[]>(`${this.baseUrl}/responJefeAreas/obtenerTodosLosResponJefeArea`)
      .pipe(
        catchError(this.handleError)
      );
  }


  //Obtener ResponJefeArea por Id
  obtenerResponJefeArea(id: number): Observable<ResponJefeArea>{
    return this.http.get<ResponJefeArea>(`${this.baseUrl}/responJefeAreas/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actulizar un ResponJefeArea
  actualizarResponJefeArea(id: number, responJefeAreaActualizada: ResponJefeArea): Observable<ResponJefeArea>{
    return this.http.put<ResponJefeArea>(`${this.baseUrl}/responJefeAreas/${id}`, responJefeAreaActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Inhabilitar ResponJefeArea
  inhabilitarResponJefeArea(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/responJefeAreas/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar ResponJefeArea
  habilitarResponJefeArea(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/responJefeAreas/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si un ResponJefeArea existe en la base de datos
  verificarResponJefeAreaExistente(responName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/responJefeAreas/existe/${encodeURIComponent(responName)}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si existe en la base de datos pero por Email.
  verificarResponJefeAreasExistentePorEmail(responEmail: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/responJefeAreas/existeEmail/${encodeURIComponent(responEmail)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    // Verifica si es un error del cliente o del servidor
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.message) {
        // Error del servidor con un mensaje
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
      } else {
        // Error del servidor sin mensaje específico
        errorMessage = `Código de error: ${error.status}, ocurrió un error desconocido.`;
      }
    }
    console.error('Error en servicio:', errorMessage);
    return throwError(errorMessage);
  }

}
