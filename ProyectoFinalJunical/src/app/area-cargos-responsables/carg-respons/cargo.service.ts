import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

interface Cargo {
  id: number;
  cargoName: string;
  cargoDescrips: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
@Injectable({
  providedIn: 'root'
})
export class CargoService {
  // URL BASE API
  //dynamicHost: string = "localhost:8080"
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  // Function para guardar un cargo
  guardarCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.baseUrl}/cargos/guardarCargo`, cargo)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar Cargo
  eliminarCargo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/cargos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todos los Cargo
  recuperarTodosCargos(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.baseUrl}/cargos/obtenerTodosLosCargos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Obtener cargos por Id
  obtenerCargo(id: number): Observable<Cargo>{
    return this.http.get<Cargo>(`${this.baseUrl}/cargos/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Actualizar un cargo
  actualizarCargo(id: number, cargoActualizada: Cargo): Observable<Cargo>{
    cargoActualizada.id=id;
    return this.http.put<Cargo>(`${this.baseUrl}/cargos/${id}`, cargoActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar cargo
  inhabilitarCargo(id: number): Observable<Cargo>{
    return this.http.put<void>(`${this.baseUrl}/cargos/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar cargo
  habilitarCargo(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/cargos/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si un cargo existe en la base de datos
  verificarCargoExistente(cargoName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/cargos/existe/${encodeURIComponent(cargoName)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function para manejar errores de HTTP
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
