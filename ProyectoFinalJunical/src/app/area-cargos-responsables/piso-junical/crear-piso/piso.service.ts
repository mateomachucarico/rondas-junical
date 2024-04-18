import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {entornos} from "../../../../Entorno/entornos";

interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
  //[key: string]: boolean | number | string;
}


interface Piso {
  id: number;
  pisoName: string;
  //pisoDescripc: string;
  pisoNumber: string;
  torre: Torre;
  habilitado: boolean;
  //[key: string]: boolean | number | string;
}
@Injectable({
  providedIn: 'root'
})
export class PisoService {

  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {
  }

  // Nuevo registro de piso
  guardarPiso(piso: Piso): Observable<Piso> {
    return this.http.post<Piso>(`${this.baseUrl}/pisos/guardarPiso`, piso)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Eliminar Piso
  eliminarPiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pisos/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
// Inhabilitar piso por ID
  inhabilitarPiso(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/pisos/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Habilitar piso
  habilitarPiso(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/pisos/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Recuperar los piso
  recuperarTodosPisos(): Observable<Piso[]> {
    return this.http.get<Piso[]>(`${this.baseUrl}/pisos/obtenerTodosLosPisos`)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Recuperar las Torres

recuperarTodosTorres(): Observable<Torre[]> {
  return this.http.get<Torre[]>(`${this.baseUrl}/torres/obtenerTodosLosTorres`)
    .pipe(
      catchError(this.handleError)
    );
}

//Obtener piso por Id
obtenerPiso(id: number): Observable<Piso> {
  return this.http.get<Piso>(`${this.baseUrl}/pisos/recuperarPorId/${id}`)
    .pipe(
      catchError(this.handleError)
    );
}

// Actualizar (Editar) Piso por ID
actualizarPiso(id: number, pisoActualizada: Piso): Observable<Piso> {
  // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL
  pisoActualizada.id = id;
  return this.http.put<Piso>(`${this.baseUrl}/pisos/${id}`, pisoActualizada)
    .pipe(
      catchError(this.handleError)
    );
}

// verificar si una piso ya existe en la base de datos
verificarPisoExistente(pisoNumber: number): Observable<boolean> {
  // Enviar el nombre del piso sin codificar
  return this.http.get<boolean>(`${this.baseUrl}/pisos/existe/${encodeURIComponent(pisoNumber)}`)
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
