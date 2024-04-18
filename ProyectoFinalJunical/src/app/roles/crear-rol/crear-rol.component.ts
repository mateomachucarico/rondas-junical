import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {RolesService} from "../roles.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

interface Rol {
  id: number;
  rolName: string;
  rolDescripc: string;
  rolFechaCreac: Date;
  rolFechaModic: Date;
  habilitado: boolean;
  [key: string]: boolean | number | string | Date;
}
@Component({
  providers: [RolesService, HttpClient],
  selector: 'app-crear-rol',
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
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.css'
})
export class CrearRolComponent implements  OnInit{

  crearForm!: FormGroup;
  rol: Rol = {
    id: 0,
    rolName: '',
    rolDescripc: '',
    rolFechaCreac: new Date(),
    rolFechaModic: new Date(),
    habilitado: false
  };
  rolCreado: boolean = false;
  rolEnProceso: boolean = false;
  errorCrearRol: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private rolService: RolesService,
  ) {
  }
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      rolName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      rolDescripc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Aquí corregido
      rolFechaCreac: [null, Validators.required],
      rolFechaModic: [null, Validators.required],
    });
  }
  onSubmit(): void {
    if (this.crearForm.valid) {
      const rolName = this.crearForm.value.rolName;
      this.rolService.verificarRolExistente(rolName).subscribe(
        (existeRol: boolean)=> {
          if (existeRol){
            this.errorCrearRol = 'El Rol ya existe en la base de datos crea una con diferente Nombre.';
          }else {
            this.rolEnProceso = true;
            this.rolService.guardarRol(this.crearForm.value).subscribe(
              (response)=>{
                this.rolEnProceso = false;
                console.log("Rol creado exitosamente!", response);
                this.crearForm.reset();
                // Mostrar mensaje de éxito al usuario
                if (!this.errorCrearRol){
                  this.rolCreado = true;
                  setTimeout(() => {
                    this.rolCreado = false;
                  }, 3000);
                }
                },
            (error) => {
              // Manejo de la respuesta con errores
              console.error(error);
              this.rolEnProceso = false; // Ocultar indicador de carga
              // Mostrar mensaje de error al usuario
              this.errorCrearRol = error.message || 'Ocurrió un error al crear el Rol.';
              // Ocultar la alerta después de 5 seconds
              setTimeout(() => {
                this.errorCrearRol = '';
              }, 5000); // Cambiado a 5000 milisegundos (5 segundos)
            }
          );
          }
          },
        (error) => {
          console.error(error);
          this.errorCrearRol = 'Error al verificar la existencia del rol.';
        }
      );
        }else {
      // Mostrar mensaje de validación al usuario
      this.crearForm.markAllAsTouched();
    }
  }
  cancelar(): void {
    this.crearForm.reset();
  }
  cerrarMensaje() {
    this.rolCreado = false;
    this.errorCrearRol = '';
  }
  //get
  get rolName() {
    return this.crearForm.get('rolName');
  }
  get rolDescripc() {
    return this.crearForm.get('rolDescripc');
  }
  get rolFechaCreac(){
    return this.crearForm.get('rolFechaCreac')
  }
  get rolFechaModic(){
    return this.crearForm.get('rolFechaModic')
  }
}
