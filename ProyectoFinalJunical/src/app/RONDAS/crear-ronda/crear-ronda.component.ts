import {Component, OnInit} from '@angular/core';
import {RondaService} from "../ronda.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

interface Torre {
  id: number;
  torreName: string;
  [key: string]: boolean | number | string;
}
interface Piso {
  id: number;
  pisoName: string;
  [key: string]: boolean | number | string;
}
interface Area {
  id: number;
  areaName: string;
  [key: string]: boolean | number | string;
}
interface Zona {
  id: number;
  zonaName: string;
  [key: string]: boolean | number | string;
}
interface Categoria{
  id: number;
  categName: string;
  [key: string]: boolean | number | string;
}
interface ResponJefeArea {
  id: number;
  responName: string;
  [key: string]: boolean | number | string;
}
interface Ronda{
  id: number;
  torre: Torre;
  piso: Piso;
  area: Area;
  zona: Zona;
  categoria: Categoria;
  responJefeArea: ResponJefeArea;
  rondaFecha: string;
  rondaHoraInicio: string;
  rondaHoraFin: string;
  rondaDescrip: string;
  rondaPrioridad: string;
  rondaFoto: string;
  rondaCorrectivo: string;
  rondaSolucion: boolean;
  rondaNoSolucion: string;

}
@Component({
  providers: [RondaService, HttpClient],
  selector: 'app-crear-ronda',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './crear-ronda.component.html',
  styleUrl: './crear-ronda.component.css'
})
export class CrearRondaComponent implements OnInit{

  ronda: Ronda= {id:0, rondaFecha: '', torre: {id:0, torreName:''}, piso: {id:0, pisoName:''}, area: {id:0, areaName:''}, zona: {id:0, zonaName:''}, categoria: {id:0, categName:''},responJefeArea: {id:0, responName:''},  rondaHoraInicio: '', rondaHoraFin:'', rondaDescrip:'', rondaPrioridad: '', rondaFoto:'', rondaCorrectivo:'', rondaSolucion: false, rondaNoSolucion: ''}
  crearForm!: FormGroup;
  torres: Torre [] = [];
  pisos: Piso [] = [];
  areas: Area [] = [];
  zonas: Zona [] = [];
  categorias: Categoria [] = [];
  responJefeAreas: ResponJefeArea [] = [];

  //Inicializacion de Variables
  errorCrearRondaFinal: string = '';
  RondaFinalCreado: boolean = false;
  RondaFinalEnProceso: boolean = false;

  //Carga de Fotos
  selectedFiles: File[] = [];
  erroresFotos: string[] = [];

  //Modal
  rondaCreado: boolean = false;
  rondaEnProceso: boolean = false;
  errorCrearRonda: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private rondaService: RondaService,
  ) {
  }
//
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      torre: ['', [Validators.required]],
      piso: ['', [Validators.required]],
      area: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      responJefeArea: ['', [Validators.required]],
      rondaFecha: ['', [Validators.required]],
      rondaHoraInicio: ['', [Validators.required]],
      rondaHoraFin: ['', [Validators.required]],
      rondaDescrip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      rondaPrioridad: ['', [Validators.required]],
      rondaFoto: ['', [Validators.required]],
      rondaCorrectivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      rondaSolucion:  ['', [Validators.required]],
      rondaNoSolucion: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],

    });
    //tengo un problema muy peculiar, se sopone que cuando esta en no debe estar habilitado el cam
    document.addEventListener('DOMContentLoaded', () => {
      const loader = document.getElementById('loader') as HTMLDivElement;
      if (loader) {
        setTimeout(() => {
          loader.style.display = 'none';
          // Muestra el contenido oculto después de que se oculta el loader
          const contenidoOculto = document.querySelector('.contenido-oculto');
          if (contenidoOculto) {
            (contenidoOculto as HTMLElement).style.display = 'block'; // Type assertion
          }
        }, 1000);
      } else {
        console.error("No se encontró el elemento con ID 'loader'");
      }
    });

    const rondaSolucionControl = this.crearForm.get('rondaSolucion');
    if (rondaSolucionControl) {
      rondaSolucionControl.valueChanges.subscribe(value => {
        const rondaNoSolucionControl = this.crearForm.get('rondaNoSolucion');
        if (rondaNoSolucionControl) {
          if (value === 'true') {
            rondaNoSolucionControl.disable();
          } else {
            rondaNoSolucionControl.enable();
          }
        }
      });
    }

  }

  onSubmit() {

  }

  cancelar(): void {
    this.crearForm.reset();
  }
  cerrarMensaje() {
    this.rondaCreado = false;
    this.errorCrearRonda = '';
  }
  seleccionarFotos(event: any) {
    const archivos: FileList = event.target.files;
    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      if (this.selectedFiles.length < 4) {
        if (this.validarTipoArchivo(archivo) && this.validarTamañoArchivo(archivo)) {
          this.selectedFiles.push(archivo);
        } else {
          this.erroresFotos.push('El archivo seleccionado no es válido.');
        }
      } else {
        this.erroresFotos.push('Solo se pueden seleccionar hasta 4 fotos.');
        break;
      }
    }
  }

  eliminarFoto(index: number) {
    this.selectedFiles.splice(index, 1);
  }
  //Otros Botones
  verFotoCompleta(file: File) {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  }
  descargarFoto(file: File) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  validarTipoArchivo(archivo: File): boolean {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
    return tiposPermitidos.includes(archivo.type);
  }

  validarTamañoArchivo(archivo: File): boolean {
    const tamanioMaximo = 500 * 1024 * 1024; // 500MB en bytes
    return archivo.size <= tamanioMaximo;
  }


  getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Aquí puedes hacer algo con la base64 si es necesario
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
  }



  get rondaDescrip() {
    return this.crearForm.get('rondaDescrip');
  }
}
