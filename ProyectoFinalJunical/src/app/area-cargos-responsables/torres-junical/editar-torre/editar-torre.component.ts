import {Component, OnInit} from '@angular/core';
import {TorresService} from "../torres.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {ActivatedRoute} from "@angular/router";

interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
@Component({
  providers: [TorresService, HttpClient],
  selector: 'app-editar-torre',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule
  ],
  templateUrl: './editar-torre.component.html',
  styleUrl: './editar-torre.component.css'
})
export class EditarTorreComponent implements  OnInit{
  editarForm!: FormGroup;
  torre: Torre = {id: 0, torreName: '', habilitado: false };
  // Variables para mensajes
  torreCreado: boolean = false;
  errorEditarTorre: string = '';
  torreEnProceso: boolean = false;
  torreId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private torresService: TorresService,
  ) {
  }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      torreName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.torreId = +id;
        this.torresService.obtenerTorre(this.torreId).subscribe(
          (response: Torre) => {
            this.torre = response;
            this.editarForm.patchValue({
              torreName: response.torreName
            });
          },
          (error) => {
            console.error(error);
            this.errorEditarTorre = 'Error al cargar la torre.';
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL...');
      }
    });
  }
  onSubmit(): void {
    // Verificar si el ID de la torre es válido
    if (this.torreId <= 0) {
      console.error("ID de torre inválido");
      return;
    }
    if (this.editarForm.valid) {
      const torre = this.editarForm.value;
      this.torresService.actualizarTorre(this.torreId, torre).subscribe(
        () => {
          this.torreCreado = true;
          this.torreEnProceso = false;
          console.log("Torre actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.torreCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.torreEnProceso = false;
          this.errorEditarTorre = error.message || 'Ocurrió un error al actualizar la torre.';
          setTimeout(() => {
            this.errorEditarTorre = '';
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
    this.torreCreado = false;
    this.errorEditarTorre = '';
  }
  // Getters para acceder a los controles del formulario
  get torreName() {
    return this.editarForm.get('torreName');
  }
}



