import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  //dynamicHost: string = "localhost:8080"
  // URL BASE API
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  //Url Base API

  constructor(private http: HttpClient) {

  }
  hideLoader() {
    const loader = document.querySelector('#loader') as Element & { style: CSSStyleDeclaration };
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none';
        const contenidoOculto = document.querySelector('.contenido-oculto') as Element & { style: CSSStyleDeclaration };
        if (contenidoOculto) {
          contenidoOculto.style.display = 'block';
        }
      }, 1000);
    } else {
      console.error("No se encontró el elemento con ID 'loader'");
    }
  }

}
