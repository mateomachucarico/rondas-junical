import {Component, OnInit} from '@angular/core';
import {RondaService} from "../ronda.service";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {LoadingService} from "../../Duplicados/loading.service";

interface Usuario {
  id: number;
  userName: string;
}
interface Torre {
  id: number;
  torreName: string;

}
interface Piso {
  id: number;
  pisoName: string;

}
interface Area {
  id: number;
  areaName: string;

}
interface Zona {
  id: number;
  zonaName: string;

}
interface Categoria{
  id: number;
  categName: string;

}
interface ResponJefeArea {
  id: number;
  responName: string;

}
interface Ronda{
  id: number;
  usuario: Usuario;
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
  providers: [RondaService, HttpClient, LoadingService],
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
  ronda!: Ronda;
  //ronda: Ronda= {id:0, rondaFecha: '', torre: {id:0, torreName:''}, piso: {id:0, pisoName:''}, area: {id:0, areaName:''}, zona: {id:0, zonaName:''}, categoria: {id:0, categName:''},responJefeArea: {id:0, responName:''},  rondaHoraInicio: '', rondaHoraFin:'', rondaDescrip:'', rondaPrioridad: '', rondaFoto:'', rondaCorrectivo:'', rondaSolucion: false, rondaNoSolucion: ''}
  crearForm!: FormGroup;
  usuarios: Usuario [] = [];
  torres: Torre [] = [];
  pisos: Piso [] = [];
  areas: Area [] = [];
  zonas: Zona [] = [];
  categorias: Categoria [] = [];
  responJefeAreas: ResponJefeArea [] = [];

  //Carga de Fotos
  selectedFiles: File[] = [];
  erroresFotos: string[] = [];

  //Modal de confirmation
  rondaCreado: boolean = false;
  rondaEnProceso: boolean = false;
  errorCrearRonda: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private rondaService: RondaService,
    private loadingService: LoadingService,
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
      usuario: ['', [Validators.required]],
      rondaFecha: ['', [Validators.required]],
      rondaHoraInicio: ['', [Validators.required]],
      rondaHoraFin: ['', [Validators.required]],
      rondaDescrip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      rondaPrioridad: ['', [Validators.required]],
      rondaFoto: ['', [Validators.required]],
      rondaCorrectivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      rondaSolucion: ['', [Validators.required]],
      rondaNoSolucion: [{
        value: '',
        disabled: true
      }, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],

    });

    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);


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
    this.cargarUsuarios();
    this.cargarTorres();
    this.cargarPisos();
    this.cargarAreas();
    this.cargarZonas();
    this.cargarCategorias();
    this.cargarResponJefeAreas();
  }
  cargarTorres(): void {
    this.rondaService.recuperarTodosTorres().subscribe(
      (torres: Torre[]) => {
        this.torres = torres;
      },
      (error) => {
        console.error('Error al cargar las torres:', error);
        // Puedes manejar el error aquí, como mostrar un mensaje al usuario
      }
    );
  }
  cargarPisos(): void {
    this.rondaService.recuperarTodosPisos().subscribe(
      (pisos: Piso[]) => {
        this.pisos = pisos;
      },
      (error) => {
        console.error('Error al cargar los pisos:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  cargarAreas(): void {
    this.rondaService.recuperarTodosAreas().subscribe(
      (areas: Area[]) => {
        this.areas = areas;
      },
      (error) => {
        console.error('Error al cargar las áreas:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  cargarZonas(): void {
    this.rondaService.recuperarTodosZonas().subscribe(
      (zonas: Zona[]) => {
        this.zonas = zonas;
      },
      (error) => {
        console.error('Error al cargar las zonas:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  cargarCategorias(): void {
    this.rondaService.recuperarTodosCategorias().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  cargarResponJefeAreas(): void {
    this.rondaService.recuperarTodosResponJefeAreas().subscribe(
      (responJefeAreas: ResponJefeArea[]) => {
        this.responJefeAreas = responJefeAreas;
      },
      (error) => {
        console.error('Error al cargar los responsables de área:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  cargarUsuarios(): void {
    this.rondaService.recuperarTodosLosUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
        // Puedes manejar el error aquí
      }
    );
  }
  onSubmit() {
    if (this.crearForm.valid)
    {
      this.rondaService.guardarRondaFinal(this.crearForm.value).subscribe(
        (response) => {
          this.rondaEnProceso = false;
          console.log("Ronda Creada Correctamente!", response);
          this.crearForm.reset();
          if(!this.errorCrearRonda){
            this.rondaCreado = true;
            setTimeout(() => {
              this.rondaCreado = false;
            }, 3000);
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.rondaEnProceso = false;
          this.errorCrearRonda = error.message || 'Ocurrio un error al crear la Ronda';
          setTimeout(() => {
            this.errorCrearRonda = '';
          }, 5000);
        }
      );
    } else {
      // Mostrar mensaje de validación al usuario
      this.crearForm.markAllAsTouched();
    }
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
