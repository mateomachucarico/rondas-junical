import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

//Interfaces
interface Rol
{
  id: number;
  rolName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface Cargo {
  id: number;
  cargoName: string;
  cargoDescrips: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}

interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  identificacion: string;
  celular: string;
  rol: Rol;
  cargo: Cargo;
  area: Area;
}

@Component({
  providers: [AuthService, HttpClient],
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
  submitting = false; // Flag para indicar que el envío está en curso
  usuario: Usuario = { id: 0, username: '', email: '', password: '',identificacion: '', celular: '', rol: {id: 0, rolName: '', habilitado: false}, cargo:{id:0, cargoName:'', cargoDescrips:'', habilitado:false}, area:{id:0, areaName:'',habilitado:false} };
  cargos: Cargo[]=[];
  areas: Area[]=[];
  roles: Rol[]=[];

  // Variables de validación de contraseña
  hasLetters: boolean | undefined;
  hasNumbers: boolean | undefined;
  hasSymbols: boolean | undefined;
  tooShort: boolean | undefined;
  private successMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombreCompleto: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmar: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), Validators.maxLength(11)]],
      rol: ['', [Validators.required]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]],
      cargo: ['', [Validators.required]],
      area: ['', [Validators.required]],
    });
    document.addEventListener('DOMContentLoaded', () => {
      const loader = document.getElementById('loader') as HTMLDivElement; // Type assertion
      if (loader) {
        setTimeout(() => {
          loader.style.display = 'none';
          // Muestra el contenido oculto después de que se oculta el loader
          const contenidoOculto = document.querySelector('.contenido-oculto');
          if (contenidoOculto) {
            (contenidoOculto as HTMLElement).style.display = 'block'; // Type assertion
          }
        }, 1000);
      } else {
        console.error("No se encontró el elemento con ID 'loader'");
      }
    });
    this.cargarAreas();
    this.cargarCargos();
    this.cargarRoles();

  }
  cargarAreas(): void {
    // Llamar a tu servicio para obtener todas las áreas
    this.authService.recuperarTodosAreas().subscribe(
      (areas: Area[]) => {
        // Filtrar solo las Areas habilitadas
        this.areas = areas.filter(area => area.habilitado);
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
        this.cargos = cargos.filter(cargo => cargo.habilitado);
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
        this.roles = roles.filter(rol => rol.habilitado);
      },
      (error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  //Getters
  get nombres() {
    return this.registerForm.get('nombres');
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
    console.log("ENTRE")
    // Verificar si el formulario ya se está procesando
    if (this.submitting) {
      return; // Evitar envío duplicado
    }
    this.submitting = true; // Marcar el formulario como procesándose
    // Deshabilitar el botón de enviar para evitar envíos adicionales
    this.registerForm.disable();
    // Asignar valores del formulario a usuario
    this.usuario.username = this.registerForm.value.nombres;
    this.usuario.email = this.registerForm.value.email;
    this.usuario.password = this.registerForm.value.password;
    this.usuario.identificacion = this.registerForm.value.identificacion;
    this.usuario.celular = this.registerForm.value.celular;
    this.usuario.rol = this.registerForm.value.rol;
    this.usuario.cargo = this.registerForm.value.cargo;
    this.usuario.area = this.registerForm.value.area;
    // Validar fortaleza de la contraseña
    this.checkPasswordStrength();
    if (this.usuario.username && this.usuario.email && !this.tooShort &&
      this.hasLetters && this.hasNumbers && this.hasSymbols) {
      // Verificar si el correo electrónico ya existe antes de registrar
      this.authService.checkExistsByEmail(this.usuario.email).subscribe(
        (existe: boolean) => {
          if (existe) {
            console.log('El correo electrónico ya está registrado');
            // Aquí puedes mostrar un mensaje de error al usuario si el correo electrónico ya está registrado
          } else {
            // El correo electrónico no existe, procede con el registro
            this.authService.registrarUsuario(this.usuario).subscribe(
              (response) => {
                console.log('Usuario registrado con éxito', response);
                // Display successful registration message to the user
                this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
                // Redirige al usuario a la página de inicio de sesión (login-junical) después de un breve retraso
                setTimeout(() => {
                  this.router.navigateByUrl('/login-junical');
                }, 2000); // Ajusta el retraso según sea necesario (en milisegundos)
                // Reiniciar el objeto usuario después de registrar
                this.usuario = { id: 0, username: '', email: '', password: '',identificacion: '', celular: '', rol: {id: 0, rolName: '', habilitado: false}, cargo:{id:0, cargoName:'', cargoDescrips:'', habilitado:false}, area:{id:0, areaName:'',habilitado:false} };
              },
              (error) => {
                console.error('Error al registrar usuario', error);
                // Aquí puedes manejar el error en caso de que falle el registro
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar si el correo electrónico existe', error);
          // Aquí puedes manejar el error en caso de que falle la verificación del correo electrónico
        }
      );
    } else {
      console.error("Revise los campos del formulario");
    }
    // Habilitar el botón de enviar después de que se complete la operación
    this.registerForm.enable();
    this.submitting = false;
  }
  //
  checkPasswordStrength() {
    const password = this.password?.value;
    this.hasLetters = /[a-zA-Z]/.test(password);
    this.hasNumbers = /\d/.test(password);
    this.hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    this.tooShort = password.length < 10;
  }
}

// falta el mensaje para el usuario que diga registro exitoso inicia seccion para continuar
