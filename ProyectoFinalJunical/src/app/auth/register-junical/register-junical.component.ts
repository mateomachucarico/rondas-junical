import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoadingService} from "../../Duplicados/loading.service";

//Interfaces
interface Rol
{
  id: number;
  rolName: string;
  habilitado: boolean;
}
interface Cargo {
  id: number;
  cargoName: string;
  habilitado:boolean;
}
interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
}

interface Usuario {
  id: number;
  userName: string;
  email: string;
  password: string;
  identificacion: string;
  celular: string;
  rol: Rol;
  cargo: Cargo;
  area: Area;
}
@Component({
  providers: [AuthService, HttpClient, LoadingService],
  selector: 'app-register-junical',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './register-junical.component.html',
  styleUrl: './register-junical.component.css'
})
export class RegisterJunicalComponent implements OnInit {
  // Variables
  registerForm!: FormGroup;
  usuario!: Usuario;
  usuarios: Usuario [] = [];
  cargos: Cargo[]=[];
  areas: Area[]=[];
  roles: Rol[]=[];

  registerCreado: boolean = false;
  registerEnProceso: boolean = false;
  errorCrearRegister: string = '';

  // Variables de validación de contraseña
  hasLetters: boolean | undefined;
  hasNumbers: boolean | undefined;
  hasSymbols: boolean | undefined;
  tooShort: boolean | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmar: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), Validators.maxLength(11)]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]],
      rol: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      area: ['', [Validators.required]],
    });
    this.cargarAreas();
    this.cargarCargos();
    this.cargarRoles();

    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);

  }

  cargarAreas(): void {
    // Llamar a tu servicio para obtener todas las áreas
    this.authService.recuperarTodosAreas().subscribe(
      (areas: Area[]) => {
        // Filtrar solo las Areas habilitadas
        this.areas = areas;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  cargarCargos(): void {
    // Llamar a tu servicio para obtener todos los cargo
    this.authService.recuperarTodosCargos().subscribe(
      (cargos: Cargo[]) => {
        // Filtrar solo las cargos habilitadas
        this.cargos = cargos;
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

cargarRoles(): void{
  // Llamar a tu servicio para obtener todos los roles
  this.authService.recuperarTodosRoles().subscribe(
    (roles: Rol[]) => {
      // Filtrar solo los roles habilitadas
      this.roles = roles;
    },
    (error) => {
      console.error(error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  );
}

//Getters
get userName() {
  return this.registerForm.get('userName');
}
get email() {
  return this.registerForm.get('email');
}
get password() {
  return this.registerForm.get('password')
}
get passwordConfirmar() {
  return this.registerForm.get('passwordConfirmar')
}
get identificacion() {
  return this.registerForm.get('identificacion');
}
get celular() {
  return this.registerForm.get('celular');
}
get rol() {
  return this.registerForm.get('rol');
}
get cargo() {
  return this.registerForm.get('cargo');
}
get area() {
  return this.registerForm.get('area');
}
// verificar - problemas de duplicados
isInvalidIdentificacion() {
  const identificacion = this.registerForm.get('identificacion');
  return identificacion && identificacion.invalid && (identificacion.dirty || identificacion.touched);
}
getErrorIdentificacion() {
  const identificacion = this.registerForm.get('identificacion');
  if (identificacion?.hasError('required')) {
    return 'El número de cédula es obligatorio.';
  }
  if (identificacion?.hasError('pattern')) {
    return 'El número de cédula debe contener solo números.';
  }
  if (identificacion?.hasError('minlength')) {
    return 'El número de cédula debe tener al menos 7 números.';
  }
  if (identificacion?.hasError('maxlength')) {
    return 'El número de cédula no debe exceder los 11 números.';
  }
  return '';
}

onSubmit() {
  if (this.registerForm.valid) {
    const userName = this.registerForm.value.areaName;
    // Verificar si el usuario ya existe
    this.authService.verificarUsuarioExistente(userName).subscribe(
      (existeArea: boolean) => {
        if (existeArea) {
          this.errorCrearRegister = 'El Usuario ya existe en la base de datos crea una con otro Nombre.';
        } else {
          this.registerEnProceso = true; // Mostrar indicador de carga
          this.authService.guardarUsuario(this.registerForm.value).subscribe(
            (response) => {
              this.registerEnProceso = false; // Ocultar indicador de carga
              // Manejo de la respuesta exitosa
              console.log("Usuario creado exitosamente!" , response);
              this.registerForm.reset();
              if (!this.errorCrearRegister) {
                this.registerCreado = true;
                setTimeout(() => {
                  this.registerCreado = false;
                }, 3000);
              }
            },
            (error) => {
              // Manejo de la respuesta con errores
              console.error(error);
              this.registerEnProceso = false; // Ocultar indicador de carga
              // Mostrar mensaje de error al usuario
              this.errorCrearRegister = error.message || 'Ocurrió un error al crear el Usuario.';
              // Ocultar la alerta después de 5 segundos
              setTimeout(() => {
                this.errorCrearRegister = '';
              }, 5000);
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.errorCrearRegister = 'Error al verificar la existencia del Usuario.';
      }
    );
  } else {
    // Mostrar mensaje de validación al usuario
    this.registerForm.markAllAsTouched();
  }
}
  cancelar(): void {
    this.registerForm.reset();
  }
  cerrarMensaje() {
    this.registerCreado = false;
    this.errorCrearRegister = '';
  }
checkPasswordStrength() {
  const password = this.password?.value;
  this.hasLetters = /[a-zA-Z]/.test(password);
  this.hasNumbers = /\d/.test(password);
  this.hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  this.tooShort = password.length < 10;
}
}




