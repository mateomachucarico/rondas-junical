import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../../Entorno/entornos";

interface Categoria {
  id: number;
  categName: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  //dynamicHost: string = "localhost:8080"
  // URL BASE API

  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  // Funcion para guardar nueva categoria
  guardarCategSopor(categSopor: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categSopor/guardarCategSopor`, categSopor)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Eliminar categoria
  eliminarCategoria(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/categSopor/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Recuperar todas las categorias
  recuperarTodosCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categSopor/obtenerTodosLosCategSopors`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Obtener Categoria por id
  obtenerCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.baseUrl}/categSopor/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Actualizar categoria
  actualizarCategoria(id: number, categoriaActualizada: Categoria): Observable<Categoria>{
    categoriaActualizada.id=id;
    return this.http.put<Categoria>(`${this.baseUrl}/categSopor/${id}`, categoriaActualizada)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Inhabilitar categoria
  inhabilitarCategoria(id: number): Observable<Categoria>{
    return this.http.put<void>(`${this.baseUrl}/categSopor/${id}/inhabilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Habilitar categoria
  habilitarCategotia(id: number): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/categSopor/${id}/habilitar`, null)
      .pipe(
        catchError(this.handleError)
      );
  }
  //Verificar si una categoria existe en la base de datos
  verificarCategoriaExistente(categName: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/categSopor/existe/${encodeURIComponent(categName)}`)
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
