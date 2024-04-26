import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ResponJefeAreaService} from "../respon-jefe-area.service";

interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  habilitado:boolean;
}
@Component({
  providers: [ResponJefeAreaService, HttpClient],
  selector: 'app-crear-respon-jefe-area',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './crear-respon-jefe-area.component.html',
  styleUrl: './crear-respon-jefe-area.component.css'
})
export class CrearResponJefeAreaComponent implements OnInit{
  crearForm!: FormGroup;
  responJefeAreas: ResponJefeArea [] = [];
  responJefeArea! : ResponJefeArea;
  responJefeAreaCreado: boolean = false;
  responJefeAreaEnProceso: boolean = false;
  errorCrearResponJefeArea: string = ''; // Inicialización de la variable

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private responJefeAreaService: ResponJefeAreaService,
  ) {
  }
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      responName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      responEmail: ['', [Validators.required, Validators.email]],

    });
  }

  onSubmit(): void {
    if (this.crearForm.valid) {
      const responName = this.crearForm.value.responName;
      const responEmail = this.crearForm.value.responEmail;

      // Verificar existencia de nombre y correo electrónico
      this.responJefeAreaService.verificarResponJefeAreaExistente(responName).subscribe(
        (existeResponNombre: boolean) => {
          if (existeResponNombre) {
            this.errorCrearResponJefeArea = 'El nombre ya existe.';
          } else {
            this.responJefeAreaService.verificarResponJefeAreasExistentePorEmail(responEmail).subscribe(
              (existeResponEmail) => {
                if (existeResponEmail) {
                  this.errorCrearResponJefeArea = 'El correo electrónico ya está registrado.';
                } else {
                  // Si ambos son válidos, proceder a crear
                  this.responJefeAreaEnProceso = true;
                  this.responJefeAreaService.guardarResponJefeArea(this.crearForm.value).subscribe(
                    (response) => {
                      this.responJefeAreaEnProceso = false;
                      console.log('Jefe de Area Creado con éxito:', response);
                      this.crearForm.reset();
                      if (!this.errorCrearResponJefeArea){
                        this.responJefeAreaCreado = true;
                        setTimeout(() => {
                          this.responJefeAreaCreado = false;
                        }, 3000);
                      }
                    },
                    (error) => {
                      console.error('Error al guardar:', error);
                      this.responJefeAreaEnProceso = false;
                      this.errorCrearResponJefeArea = error.message || 'Ocurrio un error al crear EL jefe de Area.';
                      setTimeout(() => {
                        this.errorCrearResponJefeArea = '';
                      }, 5000);
                    }
                  );
                }
              },
              (error) => {
                console.error('Error al verificar correo electrónico:', error);
                this.errorCrearResponJefeArea = 'Error al verificar correo electrónico.';
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar nombre:', error);
          this.errorCrearResponJefeArea = 'Error al verificar nombre.';
        }
      );
    } else {
      this.crearForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.crearForm.reset();
  }
  cerrarMensaje() {
    this.responJefeAreaCreado = false;
    this.errorCrearResponJefeArea = '';
  }
  // Getters para acceder a los controles del formulario
  get responName() {
    return this.crearForm.get('responName');
  }
  get responEmail() {
    return this.crearForm.get('responEmail');
  }
}

