import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ResponJefeAreaService} from "../respon-jefe-area.service";
import {ActivatedRoute} from "@angular/router";
import SignaturePad from "signature_pad";


interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface Cargo
{
  id: number;
  cargoName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  area: Area;
  cargo: Cargo;
  //responFirma: string;
  habilitado:boolean;

}
@Component({
  providers: [ResponJefeAreaService, HttpClient],
  selector: 'app-editar-jefe',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule,
    NgForOf
  ],
  templateUrl: './editar-jefe.component.html',
  styleUrl: './editar-jefe.component.css'
})
export class EditarJefeComponent implements OnInit {
  editarForm!: FormGroup;
  responJefeArea: ResponJefeArea = {
    id: 0,
    responName: '',
    responEmail: '',
    area: {id: 0, areaName: '', habilitado: false},
    cargo: {id: 0, cargoName: '', habilitado: false},
    //responFirma: '',
    habilitado: false
  };
  // Variables para mensajes
  responJefeAreaCreado: boolean = false;
  errorEditarResponJefeArea: string = '';
  responJefeAreaEnProceso: boolean = false;
  responJefeAreaId: number = 0;
  areas: Area[] = [];
  cargos: Cargo[] = [];
  private signaturePad: any;
  private firmaLimpiada: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private responJefeAreaService: ResponJefeAreaService
  ) {
  }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      responName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      responEmail: ['', [Validators.required, Validators.email]],
      area: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      //responFirma: ['', [this.firmaRequeridaValidator()]], // Agregar validación de firma requerida
    });
    // Obtener el ID del Jefe responsable de los parámetros de la URL
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; // Obtener el valor del parámetro 'id' de la URL
      if (id) {
        this.responJefeAreaId = +id; // Convertir a número, asegurando que sea un valor válido
        // Llamada al servicio para obtener los detalles del jefe de area por su ID
        this.responJefeAreaService.obtenerResponJefeArea(this.responJefeAreaId).subscribe(
          (response: ResponJefeArea) => {
            this.responJefeArea = response; // Asignar el valor del jefe obtenido del servicio
            this.editarForm.patchValue({
              responName: response.responName,
              responEmail: response.responEmail,
              area: response.area,
              cargo: response.cargo,
              //responFirma: response.responFirma,
            });
          },
          (error) => {
            console.error(error);
            this.errorEditarResponJefeArea = 'Error al cargar el Jefe de Area.';
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL.');
      }
    });
    this.cargarAreas();
    this.cargarCargos();
  }
  cargarAreas(): void {
    // Llamar a tu servicio para obtener todas las torres
    this.responJefeAreaService.recuperarTodosAreas().subscribe(
      (areas: Area[]) => {
        // Filtrar solo las torres habilitadas
        this.areas = areas.filter(area => area.habilitado);
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  cargarCargos(): void {
    // Llamar a tu servicio para obtener todas las torres
    this.responJefeAreaService.recuperarTodosCargos().subscribe(
      (cargos: Cargo[]) => {
        // Filtrar solo las torres habilitadas
        this.cargos = cargos.filter(cargo => cargo.habilitado);
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  onSubmit(): void {
    // Verificar si el ID del Jefe de Área es válido
    if (this.responJefeAreaId <= 0) {
      console.error("ID de Jefe del Area inválido");
      return;
    }
    if (this.editarForm.valid) {
      const responJefeArea = this.editarForm.value;
      this.responJefeAreaService.actualizarResponJefeArea(this.responJefeAreaId, responJefeArea).subscribe(
        () => {
          this.responJefeAreaCreado = true;
          this.responJefeAreaEnProceso = false;
          console.log("ResponJefeArea actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.responJefeAreaCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.responJefeAreaEnProceso = false;
          this.errorEditarResponJefeArea = error.message || 'Ocurrió un error al actualizar el Jefe de Area.';
          setTimeout(() => {
            this.errorEditarResponJefeArea = '';
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
    this.responJefeAreaCreado = false;
    this.errorEditarResponJefeArea = '';
  }
  // hacer la firma
  limpiarFirma() {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.firmaLimpiada = true;
    } else {
      console.error('SignaturePad no inicializado.');
    }
  }
  initSignaturePad() {
    const canvas = document.getElementById('firmaResponsableArea') as HTMLCanvasElement;
    if (canvas) {
      this.signaturePad = new SignaturePad(canvas);
      this.signaturePad.on();
    } else {
      console.error('Elemento de lienzo no encontrado.');
    }
  }
  // Función para validar que la firma es obligatoria
  firmaRequeridaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firma = control.value;
      if (!firma) {
        return { firmaRequerida: true };
      }
      return null;
    };
  }
}
