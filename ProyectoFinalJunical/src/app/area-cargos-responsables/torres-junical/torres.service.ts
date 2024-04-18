import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
@Injectable({
  providedIn: 'root'
})
export class TorresService {

  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  // Function para guardar una nueva torre
  guardarTorre(torre: Torre): Observable<Torre> {
    return this.http.post<Torre>(`${this.baseUrl}/torres/guardarTorre`, torre)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Eliminar torre
  eliminarTorre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/torres/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Recuperar todas las torres
  recuperarTodosTorres(): Observable<Torre[]> {
    return this.http.get<Torre[]>(`${this.baseUrl}/torres/obtenerTodosLosTorres`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //obtener torre
  obtenerTorre(id: number): Observable<Torre> {
    return this.http.get<Torre>(`${this.baseUrl}/torres/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Actualizar torres
  actualizarTorre(id: number, torreActualizada: Torre): Observable<Torre> {
    // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL
    torreActualizada.id = id;
    return this.http.put<Torre>(`${this.baseUrl}/torres/${id}`, torreActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Inhabilitar Torre
  inhabilitarTorre(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/torres/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Habilitar Torre
  habilitarTorre(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/torres/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }

  // verificar si una torre ya existe en la base de datos
  verificarTorreExistente(torreName: string): Observable<boolean> {
    // Enviar el nombre de la torre sin codificar
    return this.http.get<boolean>(`${this.baseUrl}/torres/existe/${encodeURIComponent(torreName)}`)
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
