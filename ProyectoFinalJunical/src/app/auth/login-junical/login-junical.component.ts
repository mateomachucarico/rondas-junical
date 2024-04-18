import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

interface Rol
{
  id: number;
  rolName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
//Interfaces
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
  selector: 'app-login-junical',
  templateUrl: './login-junical.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgIf
  ],
  styleUrls: ['./login-junical.component.css']
})
export class LoginJunicalComponent implements OnInit {

  loginForm!: FormGroup;
  usuario: Usuario = {
    id: 0,
    username: '',
    email: '',
    password: '',
    identificacion: '',
    celular: '',
    rol: {id: 0, rolName: '', habilitado: false},
    cargo: {id: 0, cargoName: '', cargoDescrips: '', habilitado: false},
    area: {id: 0, areaName: '', habilitado: false}
  };
  errorMessage: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Lógica que se ejecuta al inicializar el componente
    //Logica para el Listener de carga
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
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  onSubmit(): void {
    console.log("ENTRE")

    if (this.loginForm.valid) {
      // Asignar valores del formulario a usuario
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;

      /*
            this.authService.login(this.usuario).subscribe(
              (response: any) => {
                console.log('Inicio de sesión exitoso', response);
                if (response) {
                  this.router.navigate(['/dashboard']);
                } else {
                  this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
                }
              },
              (error: any) => {
                console.error('Error al iniciar sesión', error);
                this.errorMessage = 'Error al iniciar sesión. Intente nuevamente más tarde.';
              }
            );
          } else {
            this.errorMessage = 'Formulario de inicio de sesión inválido. Complete todos los campos.';
          }
        }

       */
    }
  }
}

