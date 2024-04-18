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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api/cargos`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  /**
   * Inicia sesión en el sistema.
   * @param credentials Credenciales del usuario (correo electrónico y contraseña).
   * @returns Observable que emite la respuesta del servidor al iniciar sesión.
   */
  login(credentials: { email: string, password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param usuario Datos del usuario a registrar.
   * @returns Observable que emite la respuesta del servidor al registrar el usuario.
   */
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Verifica si un correo electrónico ya está registrado en el sistema.
   * @param email Correo electrónico a verificar.
   * @returns Observable que emite un booleano indicando si el correo electrónico está registrado.
   */
  checkExistsByEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/userExiste/porEmail?email=${email}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Ingreso al Login

  // Método para cerrar sesión


  /**
   * Maneja los errores de las solicitudes HTTP.
   * @returns Observable que emite el mensaje de error.
   * @param clave
   */
  // clave de acceso para registrar un usuario solo para administradores
  verificarClaveAcceso(clave: string) {
    return this.http.post<boolean>('/usuarios/verificar-clave', { clave });
  }
  //recuperar Área, Cargo, Rol
  //Recuperar todos los Cargos
  recuperarTodosCargos(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.baseUrl}/cargos/obtenerTodosLosCargos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar Areas
  recuperarTodosAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.baseUrl}/areas/obtenerTodosLosAreas`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar Roles
  recuperarTodosRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.baseUrl}/roles/obtenerTodosLosRoles`)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Función para manejar errores de HTTP
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

