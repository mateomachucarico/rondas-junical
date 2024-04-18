import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../../Entorno/entornos";

//Interfaces
interface Rol
{
  id: number;
  rolName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface Cargo {
  id: number;
  cargoName: string;
  cargoDescrips: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  identificacion: string;
  celular: string;
  rol: Rol;
  cargo: Cargo;
  area: Area;
  habilitado: boolean;

}
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private  http: HttpClient) { }

  // Funcion para guardar nuevo usuario

  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/guardarUsuario`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar Usuario
  eliminarUsuario(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar Usuarios
  inhabilitarUsuario(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/usuarios/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar Usuarios
  habilitarUsuario(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/usuarios/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todos los usuarios
  recuperarTodosLosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/obtenerTodosLosUsuarios`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener Usuario por Id
  obtenerUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actualizar un Usuario
  actualizarUsuario(id: number, usuarioActualizada: Usuario): Observable<Usuario>{
    usuarioActualizada.id = id;
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${id}`, usuarioActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si un usuario existe en la base de datos
  verficarUsuarioExistente(username: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/existe/${encodeURIComponent(username)}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si un usuario existe por Email
  verficarEmailExistente(email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/existe/email/${encodeURIComponent(email)}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si existe por numero de identificacion
  verficarIdentificacionExistente(identificacion: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/existe/identificacion/${encodeURIComponent(identificacion)}`)
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
