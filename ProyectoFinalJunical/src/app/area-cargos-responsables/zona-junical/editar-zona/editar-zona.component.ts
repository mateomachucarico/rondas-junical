import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ZonaService} from "../zona.service";
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-editar-zona',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './editar-zona.component.html',
  styleUrl: './editar-zona.component.css'
})
export class EditarZonaComponent implements OnInit{
  editarForm!: FormGroup;
  zona!: Zona;
  torres: Torre []=[];
  pisos: Piso []=[];
  areas: Area []=[];
  // Variables para mensajes
  zonaCreado: boolean = false;
  errorEditarZona: string = '';
  zonaEnProceso: boolean = false;
  zonaId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private zonaService: ZonaService
  ) {
  }
  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      zonaName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      torre: ['', [Validators.required]],
      piso: ['', [Validators.required]],
      area: ['', [Validators.required]],

    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.zonaId = +id;
        this.zonaService.obtenerZona(this.zonaId).subscribe(
          (response: Zona) => {
            this.zona = response;
            this.editarForm.patchValue({
              zonaName: response.zonaName
            });
          },
          (error) => {
            console.error(error);
            if (error.status === 404) {
              this.errorEditarZona = 'La Zona no se encontró. Verifica el ID proporcionado.';
            } else {
              this.errorEditarZona = 'Error al cargar la Zona. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL...');
      }
    });
    this.cargarTorres();
    this.cargarPisos();
    this.cargarAreas();
  }
cargarTorres(): void {
  this.zonaService.recuperarTodosTorres().subscribe(
    (torres: Torre[]) => {
      this.torres = torres.filter(torre => torre.habilitado);
    },
    (error) => {
      console.error(error);
    }
  );
}
  cargarPisos(): void {
    this.zonaService.recuperarTodosPisos().subscribe(
      (pisos: Piso[]) => {
        this.pisos = pisos; // Assign all pisos without filtering
      },
      (error) => {
        console.error(error);
      }
    );
  }
  cargarAreas(): void {
    this.zonaService.recuperarTodosAreas().subscribe(
      (areas: Area[]) => {
        this.areas = areas.filter(area => area.habilitado);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    // Verificar si el ID de la zona es válido
    if (this.zonaId <= 0) {
      console.error("ID de zona inválido");
      return;
    }
    if (this.editarForm.valid) {
      const zona = this.editarForm.value;
      this.zonaService.actualizarZona(this.zonaId, zona).subscribe(
        () => {
          this.zonaCreado = true;
          this.zonaEnProceso = false;
          console.log("Zona actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.zonaCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.zonaEnProceso = false;
          this.errorEditarZona = error.message || 'Ocurrió un error al actualizar la zona.';
          setTimeout(() => {
            this.errorEditarZona = '';
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
    this.zonaCreado = false;
    this.errorEditarZona = '';
  }
  // Getters para acceder a los controles del formulario
  get zonaName() {
    return this.editarForm.get('zonaName');
  }
  get torre() {
    return this.editarForm.get('torre');
  }
  get piso() {
    return this.editarForm.get('piso');
  }
  get area() {
    return this.editarForm.get('area');
  }
}
