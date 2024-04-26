import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, KeyValuePipe, NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaService} from "../area.service";


/*
interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;

}
interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
}
 */

interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  habilitado:boolean;
}
interface Area {
  id: number;
  areaName: string;
  //torre: Torre;
  //piso: Piso;
  responJefeArea: ResponJefeArea;
  habilitado: boolean;
}
@Component({
  providers: [AreaService, HttpClient],
  selector: 'app-crear-area',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './crear-area.component.html',
  styleUrl: './crear-area.component.css'
})
export class CrearAreaComponent implements OnInit {
  crearForm!: FormGroup;
  area!: Area;
  areas: Area []= [];
  //torres: Torre []=[];
  //pisos: Piso [] = [];
  responJefeAreas: ResponJefeArea [] = [];
  areaCreado: boolean = false;
  areaEnProceso: boolean = false;
  errorCrearArea: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private areaService: AreaService,
  ) {
  }

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      areaName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      //torre: ['', [Validators.required]],
      //piso: ['', [Validators.required]],
      responJefeArea: ['', [Validators.required]],

    });
    //this.cargarTorres();
    //this.cargarPisos();
    this.cargarResponJefeAreas();
  }
  /*
  cargarTorres(): void {
    this.areaService.recuperarTodosTorres().subscribe(
      (torres: Torre[]) => {
        this.torres = torres.filter(torre => torre.habilitado);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  cargarPisos(): void {
    this.areaService.recuperarTodosPisos().subscribe(
      (pisos: Piso[]) => {
        this.pisos = pisos;
      },
      (error) => {
        console.error(error);
      }
    );
  }
*/
  cargarResponJefeAreas(): void {
    // Llamar al servicio para obtener todos los responsables de área de jefe
    this.areaService.recuperarTodosResponJefeArea().subscribe(
      (responJefeAreas: ResponJefeArea[]) => {
        // Asignar directamente todos los responsables de área de jefe, sin filtrar
        this.responJefeAreas = responJefeAreas;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  onSubmit(): void {
    if (this.crearForm.valid) {
      const areaName = this.crearForm.value.areaName;
      // Verificar si el area ya existe
      this.areaService.verificarAreaExistente(areaName).subscribe(
        (existeArea: boolean) => {
          if (existeArea) {
            this.errorCrearArea = 'El Area ya existe en la base de datos crea una con otro Nombre.';
          } else {
            this.areaEnProceso = true; // Mostrar indicador de carga
            this.areaService.guardarArea(this.crearForm.value).subscribe(
              (response) => {
                this.areaEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Piso creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearArea) {
                  this.areaCreado = true;
                  setTimeout(() => {
                    this.areaCreado = false;
                  }, 3000);
                }
              },
              (error) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.areaEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearArea = error.message || 'Ocurrió un error al crear el Area.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearArea = '';
                }, 5000);
              }
            );
          }
        },
        (error) => {
          console.error(error);
          this.errorCrearArea = 'Error al verificar la existencia del area.';
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
    this.areaCreado = false;
    this.errorCrearArea = '';
  }
  //get
  get areaName() {
    return this.crearForm.get('areaName');
  }
  get responJefeArea() {
    return this.crearForm.get('responJefeArea');
  }
}
