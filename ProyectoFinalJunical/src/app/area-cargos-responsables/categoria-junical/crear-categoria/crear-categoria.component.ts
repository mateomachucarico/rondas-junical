import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, KeyValuePipe} from "@angular/common";
import {CategoriaService} from "../categoria.service";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";


interface Categoria {
  id: number;
  categName: string;
  habilitado:boolean;
}
@Component({
  providers: [CategoriaService, HttpClient],
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe
  ],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent implements OnInit{

  crearForm!: FormGroup;
  categoria: Categoria = {id:0, categName: '',habilitado:false};
  categoriaCreado: boolean = false;
  categoriaEnProceso: boolean = false;
  errorCrearCategoria: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private categoriaService: CategoriaService,
  ) {
  }

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      categName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
       });
  }
  onSubmit(): void {
    if (this.crearForm.valid) {
      const categName = this.crearForm.value.categName;
      // Llamada al servicio para registrar el categoria
      this.categoriaService.verificarCategoriaExistente(categName).subscribe(
        (existeCategoria: boolean) => {
          if (existeCategoria) {
            this.errorCrearCategoria = 'La Categoria ya existe en la base de datos crea una con otro Nombre.';
          } else {
          this.categoriaEnProceso = true;
            this.categoriaService.guardarCategSopor(this.crearForm.value).subscribe(
              (response) => {
                this.categoriaEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Categoria creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearCategoria) {
                  this.categoriaCreado = true;
                  setTimeout(() => {
                    this.categoriaCreado = false;
                  }, 3000);
                }
              },
              (error: HttpErrorResponse) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.categoriaEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearCategoria = error.message || 'Ocurrió un error al crear la Categoria.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearCategoria = '';
                }, 5000);
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errorCrearCategoria = 'Error al verificar la existencia de la Categoria.';
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
    this.categoriaCreado = false;
    this.errorCrearCategoria = '';
  }

  //get
  get categName() {
    return this.crearForm.get('categName');
  }
}
