import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../../../app.component";
import {ActivatedRoute} from "@angular/router";


interface Categoria {
  id: number;
  categName: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
@Component({
  providers: [CategoriaService, HttpClient],
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule
  ],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements  OnInit{
  editarForm!: FormGroup;
  categoria: Categoria = {id: 0, categName: '', habilitado: false };
  // Variables para mensajes
  categoriaCreado: boolean = false;
  errorEditarCategoria: string = '';
  categoriaEnProceso: boolean = false;
  categoriaId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {
  }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      categName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoriaId = +id;
        this.categoriaService.obtenerCategoria(this.categoriaId).subscribe(
          (response: Categoria) => {
            this.categoria = response;
            this.editarForm.patchValue({
              categName: response.categName
            });
          },
          (error) => {
            console.error(error);
            if (error.status === 404) {
              this.errorEditarCategoria = 'La categoría no se encontró. Verifica el ID proporcionado.';
            } else {
              this.errorEditarCategoria = 'Error al cargar la categoría. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL...');
      }
    });
  }
    onSubmit(): void {
    // Verificar si el ID de la categoria es válido
    if (this.categoriaId <= 0) {
      console.error("ID de categoria inválido");
      return;
    }
    if (this.editarForm.valid) {
      const categoria = this.editarForm.value;
      this.categoriaService.actualizarCategoria(this.categoriaId, categoria).subscribe(
        () => {
          this.categoriaCreado = true;
          this.categoriaEnProceso = false;
          console.log("Categoria actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.categoriaCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.categoriaEnProceso = false;
          this.errorEditarCategoria = error.message || 'Ocurrió un error al actualizar la categoria.';
          setTimeout(() => {
            this.errorEditarCategoria = '';
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
    this.categoriaCreado = false;
    this.errorEditarCategoria = '';
  }
  // Getters para acceder a los controles del formulario
  get categName() {
    return this.editarForm.get('categName');
  }
}
