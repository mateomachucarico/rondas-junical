import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {entornos} from "../../Entorno/entornos";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) { }


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
