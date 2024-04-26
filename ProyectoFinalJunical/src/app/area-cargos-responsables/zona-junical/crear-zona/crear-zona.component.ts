import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ZonaService} from "../zona.service";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
interface Area {
  id: number;
  areaName: string;
  habilitado: boolean;
}
interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
}
interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}
interface Zona {
  id: number;
  zonaName: string;
  torre: Torre;
  piso: Piso;
  area: Area;
  habilitado: boolean;
}
@Component({
  providers: [ZonaService, HttpClient],
  selector: 'app-crear-zona',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf,
    CommonModule,
  ],
  templateUrl: './crear-zona.component.html',
  styleUrl: './crear-zona.component.css'
})
export class CrearZonaComponent implements  OnInit{

  crearForm!: FormGroup;
  zona!: Zona;
  zonas: Zona [] = [];
  torres: Torre []=[];
  pisos: Piso[] = [];
  areas: Area [] = [];
  zonaCreado: boolean = false;
  zonaEnProceso: boolean = false
  errorCrearZona: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private zonaService: ZonaService,

  ) {}

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      zonaName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      torre: ['', [Validators.required]],
      piso: ['', [Validators.required]],
      area: ['', [Validators.required]],

    });
    this.cargarTorres();
    this.cargarPisos();
    this.cargarAreas();
  }
  cargarTorres(): void{
    this.zonaService.recuperarTodosTorres().subscribe(
      (torres: Torre[]) =>{
        this.torres = torres;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  cargarPisos(): void{
    this.zonaService.recuperarTodosPisos().subscribe(
      (pisos: Piso[]) =>{
        this.pisos = pisos;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  cargarAreas(): void{
    this.zonaService.recuperarTodosAreas().subscribe(
      (areas: Area[]) =>{
        this.areas = areas;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  onSubmit(): void {
    if (this.crearForm.valid) {
      const zonaName = this.crearForm.value.zonaName;
      // Llamada al servicio para registrar la zona
      this.zonaService.verificarZonaExistente(zonaName).subscribe(
        (existeZona: boolean) => {
          if (existeZona) {
            this.errorCrearZona = 'La Zona ya existe en la base de datos crea una con otro Nombre.';
          } else {
            this.zonaEnProceso = true;
      this.zonaService.guardarZona(this.crearForm.value).subscribe(
        (response) => {
          this.zonaEnProceso = false;
          // Manejo de la respuesta exitosa
          console.log("Zona creado exitosamente!", response);
          this.crearForm.reset();
          if (!this.errorCrearZona) {
            this.zonaCreado = true;
            setTimeout(() => {
              this.zonaCreado = false;
            }, 3000);
          }
        },
        (error: HttpErrorResponse) => {
          // Manejo de la respuesta con errores
          console.error(error);
          this.zonaEnProceso = false; // Ocultar indicador de carga
          // Mostrar mensaje de error al usuario
          this.errorCrearZona = error.message || 'Ocurrió un error al crear la Zona.';
          // Ocultar la alerta después de 5 segundos
          setTimeout(() => {
            this.errorCrearZona = '';
          }, 5000);
        }
      );
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errorCrearZona = 'Error al verificar la existencia de la Zona.';
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
    this.zonaCreado = false;
    this.errorCrearZona = '';
  }

  //get
  get zonaName() {
    return this.crearForm.get('zonaName');
  }
  get torre() {
    return this.crearForm.get('torre');
  }
  get piso() {
    return this.crearForm.get('piso');
  }
  get area() {
    return this.crearForm.get('area');
  }
}
