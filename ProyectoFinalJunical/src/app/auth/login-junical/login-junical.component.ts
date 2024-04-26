import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {LoadingService} from "../../Duplicados/loading.service";



interface Usuario {
  id: number;
  userName: string;
  email: string;
  password: string;
  identificacion: string;
  celular: string;
}

@Component({
  providers: [AuthService, HttpClient, LoadingService],
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
    userName: '',
    email: '',
    password: '',
    identificacion: '',
    celular: ''
  };

  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    //Logica para el Listener de carga
    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Asignar valores del formulario a usuario
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;

      this.authService.login(this.usuario).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);
          if (response) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
          }
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          if (error.status === 401) {
            this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Intente nuevamente más tarde.';
          }
        }
      );

      // Limpiar los campos del formulario después del envío
      this.loginForm.reset();
    } else {
      this.errorMessage = 'Formulario de inicio de sesión inválido. Complete todos los campos.';
    }
  }
}

