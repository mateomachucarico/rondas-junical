import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../Entorno/entornos";

interface Rol {
  id: number;
  rolName: string;
  rolDescripc: string;
  rolFechaCreac: Date;
  rolFechaModic: Date;
  habilitado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {
  }
  // Funcion para guardar nuevo rol
  guardarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.baseUrl}/roles/guardarRol`, rol)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar Rol
  eliminarRol(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/roles/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar rol
  inhabilitarRol(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/roles/${id}/inhabilitar`, null)
      .pipe(
        catchError((error) => {
          console.error('Error al inhabilitar el rol:', error);
          return throwError(error);
        })
      );
  }

  //Habilitar rol
  habilitarRol(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/roles/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Recuperar todos los roles
  recuperarTodosLosRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.baseUrl}/roles/obtenerTodosLosRoles`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener rol por Id
  obtenerRol(id: number): Observable<Rol>{
    return this.http.get<Rol>(`${this.baseUrl}/roles/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actualizar Rol
  actualizarRol(id: number, rolActualizada: Rol): Observable<Rol>{
    rolActualizada.id = id;
    return this.http.put<Rol>(`${this.baseUrl}/roles/${id}`, rolActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si un rol ya existe en la base de datos
  verificarRolExistente(rolName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/roles/existe/${encodeURIComponent(rolName)}`)
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
