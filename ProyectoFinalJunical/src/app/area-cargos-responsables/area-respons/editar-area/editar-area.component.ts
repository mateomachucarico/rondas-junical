import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AreaService} from "../area.service";
import {ActivatedRoute} from "@angular/router";

interface Area {
  id: number;
  areaName: string;
  //areaDescripc: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;

}
@Component({
  providers:[AreaService, HttpClient],
  selector: 'app-editar-area',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule
  ],
  templateUrl: './editar-area.component.html',
  styleUrl: './editar-area.component.css'
})
export class EditarAreaComponent  implements  OnInit{
  editarForm!: FormGroup;
  area: Area = {id: 0, areaName: '', habilitado: false };
  // Variables para mensajes
  areaCreado: boolean = false;
  errorEditarArea: string = '';
  areaEnProceso: boolean = false;
  areaId: number= 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaService,
  ) {
  }
  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      areaName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      //areaDescripc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.areaId = +id;
        this.areaService.obtenerArea(this.areaId).subscribe(
          (response: Area) => {
            this.area = response;
            this.editarForm.patchValue({
              areaName: response.areaName,
              //areaDescripc: response.areaDescripc
            });
          },
          (error) => {
            console.error(error);
            if (error.status === 404) {
              this.errorEditarArea = 'La area no se encontró. Verifica el ID proporcionado.';
            } else {
              this.errorEditarArea = 'Error al cargar la area. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL...');
      }
    });
  }
  onSubmit(): void {
    // Verificar si el ID del area es válido
    if (this.areaId <= 0) {
      console.error("ID de area inválido");
      return;
    }
    if (this.editarForm.valid) {
      const area = this.editarForm.value;
      this.areaService.actualizarArea(this.areaId, area).subscribe(
        () => {
          this.areaCreado = true;
          this.areaEnProceso = false;
          console.log("area actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.areaCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.areaEnProceso = false;
          this.errorEditarArea = error.message || 'Ocurrió un error al actualizar la area.';
          setTimeout(() => {
            this.errorEditarArea = '';
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
    this.areaCreado = false;
    this.errorEditarArea = '';
  }
  // Getters para acceder a los controles del formulario
  get areaName() {
    return this.editarForm.get('areaName');
  }

}
