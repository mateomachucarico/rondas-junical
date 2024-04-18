import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, KeyValuePipe} from "@angular/common";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {AreaService} from "../area.service";

interface Area {
  id: number;
  areaName: string;
  //areaDescripc: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;

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
      KeyValuePipe
    ],
  templateUrl: './crear-area.component.html',
  styleUrl: './crear-area.component.css'
})
export class CrearAreaComponent implements OnInit {
  crearForm!: FormGroup;
  area: Area = {id: 0, areaName: '', habilitado: false};
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
      //areaDescripc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }
  onSubmit(): void {
    if (this.crearForm.valid) {
      const areaName = this.crearForm.value.areaName;
      // Llamada al servicio para registrar el area
      this.areaService.verificarAreaExistente(areaName).subscribe(
        (existeArea: boolean) => {
          if (existeArea) {
            this.errorCrearArea = 'La Area ya existe en la base de datos crea una con otro Nombre.';
          } else {
            this.areaEnProceso = true;
            this.areaService.guardarArea(this.crearForm.value).subscribe(
              (response) => {
                this.areaEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Area creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearArea) {
                  this.areaCreado = true;
                  setTimeout(() => {
                    this.areaCreado = false;
                  }, 3000);
                }
              },
              (error: HttpErrorResponse) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.areaEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearArea = error.message || 'Ocurrió un error al crear la Area.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearArea = '';
                }, 5000);
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errorCrearArea = 'Error al verificar la existencia de la Area.';
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
}
