import {Component, OnInit} from '@angular/core';
import {RolesService} from "../roles.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-editar-rol',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css'
})
export class EditarRolComponent implements OnInit {
  editarForm!: FormGroup;
  rol: Rol = {
    id: 0,
    rolName: '',
    rolDescripc: '',
    rolFechaCreac: new Date(),
    rolFechaModic: new Date(),
    habilitado: false
  };
  rolCreado: boolean = false;
  errorEditarRol: string = '';
  rolEnProceso: boolean = false;
  rolId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private rolesService: RolesService
  ) {
  }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      rolName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      rolDescripc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Aquí corregido
      rolFechaCreac: [null, Validators.required],
      rolFechaModic: [null, Validators.required],
    });
    // Obtener el ID del piso de los parámetros de la URL
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; // Obtener el valor del parámetro 'id' de la URL
      if (id) {
        this.rolId = +id; // Convertir a número, asegurando que sea un valor válido
        // Llamada al servicio para obtener los detalles del rol por su ID
        this.rolesService.obtenerRol(this.rolId).subscribe(
          (response: Rol) => {
            this.rol = response; // Asignar el valor del piso obtenido del servicio
            this.editarForm.patchValue({
              rolName: response.rolName,
              rolDescripc: response.rolDescripc,
              rolFechaCreac: response.rolFechaCreac,
              rolFechaModic: response.rolFechaModic,

            });
          },
          (error) => {
            console.error(error);
            this.errorEditarRol = 'Error al cargar el Rol.';
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL.');
      }
    });
  }
  onSubmit(): void {
    // Verificar si el ID del rol es válido
    if (this.rolId <= 0) {
      console.error("ID de rol inválido");
      return;
    }

    if (this.editarForm.valid) {
      const rol = this.editarForm.value;
      this.rolesService.actualizarRol(this.rolId, rol).subscribe(
        () => {
          this.rolCreado = true;
          this.rolEnProceso = false;
          console.log("Rol actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.rolCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.rolEnProceso = false;
          this.errorEditarRol = error.message || 'Ocurrió un error al actualizar el rol.';
          setTimeout(() => {
            this.errorEditarRol = '';
          }, 5000);
        }
      );
    } else {
      this.editarForm.markAllAsTouched();
    }
  }
// Método para cancelar la edición
  cancelar() {
    this.editarForm.reset();
  }
// Método para cerrar mensajes
  cerrarMensaje() {
    this.rolCreado = false;
    this.errorEditarRol = '';
  }
// Getters para acceder a los controles del formulario
  get rolName() {
    return this.editarForm.get('rolName');
  }

  get rolDescripc() {
    return this.editarForm.get('rolDescripc');
  }
  get rolFechaCreac(){
    return this.editarForm.get('rolFechaCreac')
  }
  get rolFechaModic(){
    return this.editarForm.get('rolFechaModic')
  }

}
