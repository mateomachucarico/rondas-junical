import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PisoService } from "../crear-piso/piso.service";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../../../app.component";


interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
  //[key: string]: boolean | number | string;
}


interface Piso {
  id: number;
  pisoName: string;
  //pisoDescripc: string;
  pisoNumber: string;
  torre: Torre;
  //[key: string]: boolean | number | string;
}

@Component({
  providers: [PisoService, HttpClient],
  selector: 'app-editar-piso',
  templateUrl: './editar-piso.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule,
    NgForOf
  ],
  styleUrls: ['./editar-piso.component.css']
})
export class EditarPisoComponent implements OnInit {
  editarForm!: FormGroup;
  piso: Piso = { id: 0, pisoName: '', pisoNumber: '', torre: {id: 0, torreName: '', habilitado: false}  };
  // Variables para mensajes
  pisoCreado: boolean = false;
  errorEditarPiso: string = '';
  pisoEnProceso: boolean = false;
  pisoId: number = 0;
  torres: Torre[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pisoService: PisoService
  ) {
  }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      pisoName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      //pisoDescripc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      pisoNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(1), Validators.maxLength(5)]],
      torre: ['', [Validators.required]],
    });
    // Obtener el ID del piso de los parámetros de la URL
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; // Obtener el valor del parámetro 'id' de la URL
      if (id) {
        this.pisoId = +id; // Convertir a número, asegurando que sea un valor válido
        // Llamada al servicio para obtener los detalles del piso por su ID
        this.pisoService.obtenerPiso(this.pisoId).subscribe(
          response => {
            this.piso = response; // Asignar el valor del piso obtenido del servicio
            this.editarForm.patchValue({
              pisoName: response.pisoName,
              //pisoDescripc: response.pisoDescripc,
              pisoNumber: response.pisoNumber,
              torre: response.torre
            });
          },
          (error) => {
            console.error(error);
            this.errorEditarPiso = 'Error al cargar el piso.';
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL.');
      }
    });
    this.cargarTorres();
  }

cargarTorres(): void {
  // Llamar a tu servicio para obtener todas las torres
  this.pisoService.recuperarTodosTorres().subscribe(
    (torres: Torre[]) => {
      // Filtrar solo las torres habilitadas
      this.torres = torres.filter(torre => torre.habilitado);
    },
    (error) => {
      console.error(error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  );
}

onSubmit(): void {
  // Verificar si el ID del piso es válido
  if (this.pisoId <= 0) {
    console.error("ID de piso inválido");
    return;
  }

  if (this.editarForm.valid) {
    const piso = this.editarForm.value;
    this.pisoService.actualizarPiso(this.pisoId, piso).subscribe(
      () => {
        this.pisoCreado = true;
        this.pisoEnProceso = false;
        console.log("Piso actualizada exitosamente!");
        this.editarForm.reset();
        setTimeout(() => {
          this.pisoCreado = false;
        }, 4000);
      },
      (error) => {
        console.error(error);
        this.pisoEnProceso = false;
        this.errorEditarPiso = error.message || 'Ocurrió un error al actualizar el piso.';
        setTimeout(() => {
          this.errorEditarPiso = '';
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
  this.pisoCreado = false;
  this.errorEditarPiso = '';
}
// Getters para acceder a los controles del formulario
get pisoName() {
  return this.editarForm.get('pisoName');
}

get pisoNumber() {
  return this.editarForm.get('pisoNumber');
}
get torre() {
  return this.editarForm.get('torre');
}
//Validación para PisoNumber
isInvalidPisoNumber() {
  const pisoNumber = this.editarForm.get('pisoNumber');
  return pisoNumber && pisoNumber.invalid && (pisoNumber.dirty || pisoNumber.touched);
}
// Método para obtener errores de pisoNumber
getErrorPisoNumber() {
  const pisoNumber = this.editarForm.get('pisoNumber');
  if (pisoNumber?.hasError('required')) {
    return 'El número de Piso es obligatorio.';
  }
  if (pisoNumber?.hasError('pattern')) {
    return 'El número de Piso debe contener solo números.';
  }
  if (pisoNumber?.hasError('minlength')) {
    return 'El número de Piso debe tener al menos 1 número.';
  }
  if (pisoNumber?.hasError('maxlength')) {
    return 'El número de Piso no debe exceder los 5 números.';
  }
  return '';
}
}
