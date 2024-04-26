import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {entornos} from "../../Entorno/entornos";

//Interfaces

interface Rol
{
  id: number;
  rolName: string;
  habilitado: boolean;
}

interface Cargo {
  id: number;
  cargoName: string;
  habilitado:boolean;
}
interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
}
interface Usuario {
  id: number;
  userName: string;
  email: string;
  password: string;
  identificacion: string;
  celular: string;
  rol: Rol;
  cargo: Cargo;
  area: Area;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }

  /**
   * Inicia sesión en el sistema.
   * @param credentials Credenciales del usuario (correo electrónico y contraseña).
   * @returns Observable que emite la respuesta del servidor al iniciar sesión.
   */
  login(credentials: { email: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param usuario Datos del usuario a registrar.
   * @returns Observable que emite la respuesta del servidor al registrar el usuario.
   */
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/guardarUsuarios`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Verifica si un correo electrónico ya está registrado en el sistema.
   * @param email Correo electrónico a verificar.
   * @returns Observable que emite un booleano indicando si el correo electrónico está registrado.
   */
  verificarUsuarioPorEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/userExiste/${encodeURIComponent(email)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Verificar si existe un usario por el nombre
  verificarUsuarioExistente(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/existe/${encodeURIComponent(userName)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Verificar si existe un usuario por la identificacion
  existePorIdentificacion(identificacion: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/existePorIdentificacion/${encodeURIComponent(identificacion)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para cerrar sesión

  /**
   * Maneja los errores de las solicitudes HTTP.
   * @returns Observable que emite el mensaje de error.
   * @param clave
   */
  // clave de acceso para registrar un usuario solo para administradores
  verificarClaveAcceso(clave: string) {
    return this.http.post<boolean>('/usuarios/verificar-clave', {clave});
  }

  //recuperar Área, Cargo, Rol
  //Recuperar todos los Cargos
  recuperarTodosCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.baseUrl}/cargos/obtenerTodosLosCargos`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Recuperar Areas
  recuperarTodosAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/areas/obtenerTodosLosAreas`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Recuperar Roles

  recuperarTodosRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles/obtenerTodosLosRoles`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar Usuarios
  eliminarUsuario(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar Usuarios
  recuperarTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/obtenerTodosLosUsuario`)
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
  //Actualizar Usuario
  actualizarUsuario(id: number, usuarioActualizada: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${id}`, usuarioActualizada)
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

// Función para manejar errores de HTTP
handleError(error: HttpErrorResponse) {
  let errorMessage = 'Error desconocido';
  if (error.error instanceof ErrorEvent) {
    // Error del lado del cliente
    errorMessage = `Error: ${error.error.message}`;
  } else if (error.error && error.error.message) {
    // Error del lado del servidor con mensaje definido
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Error del lado del servidor sin mensaje definido
    errorMessage = `Error: ${error.statusText}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

}

