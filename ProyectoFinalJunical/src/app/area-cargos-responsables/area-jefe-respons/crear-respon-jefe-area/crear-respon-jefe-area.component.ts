import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ResponJefeAreaService} from "../respon-jefe-area.service";
import SignaturePad from 'signature_pad';

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
  responJefeAreaCreado: boolean = false;
  responJefeAreaEnProceso: boolean = false;
  responJefeArea: ResponJefeArea = {id:0, responName: '', responEmail: '', area: { id: 0, areaName: '', habilitado: false }, cargo: { id: 0, cargoName: '', habilitado: false }, habilitado:false };
  errorCrearResponJefeArea: string = ''; // Inicialización de la variable
  private signaturePad: any;
  private firmaLimpiada: boolean = false;
  areas: Area[] = [];
  cargos: Cargo[] = [];
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
      area: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      //responFirma: ['', [this.firmaRequeridaValidator()]], // Agregar validación de firma requerida
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
  get responArea() {
    return this.crearForm.get('responArea');
  }
  get responCargo() {
    return this.crearForm.get('responCargo');
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

