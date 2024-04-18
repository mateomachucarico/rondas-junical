import { Routes} from '@angular/router';
import { NopageFoundComponent } from "./errores/nopage-found/nopage-found.component";
import { LoginJunicalComponent } from "./auth/login-junical/login-junical.component";
import { PagesComponent } from "./pages/pages.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { RegisterJunicalComponent } from "./auth/register-junical/register-junical.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import {AreaResponsComponent} from "./area-cargos-responsables/area-respons/area-respons.component";
import {CrearAreaComponent} from "./area-cargos-responsables/area-respons/crear-area/crear-area.component";
import {CargResponsComponent} from "./area-cargos-responsables/carg-respons/carg-respons.component";
import {CrearCargoComponent} from "./area-cargos-responsables/carg-respons/crear-cargo/crear-cargo.component";
import {PisoJunicalComponent} from "./area-cargos-responsables/piso-junical/piso-junical.component";
import {CrearPisoComponent} from "./area-cargos-responsables/piso-junical/crear-piso/crear-piso.component";
import {TorresJunicalComponent} from "./area-cargos-responsables/torres-junical/torres-junical.component";
import {CrearTorreComponent} from "./area-cargos-responsables/torres-junical/crear-torre/crear-torre.component";
import {UsuariosJunicalComponent} from "./auth/login-junical/usuarios-junical/usuarios-junical.component";
import {CategoriaJunicalComponent} from "./area-cargos-responsables/categoria-junical/categoria-junical.component";
import {
  CrearCategoriaComponent
} from "./area-cargos-responsables/categoria-junical/crear-categoria/crear-categoria.component";
import {ZonaJunicalComponent} from "./area-cargos-responsables/zona-junical/zona-junical.component";
import {CrearZonaComponent} from "./area-cargos-responsables/zona-junical/crear-zona/crear-zona.component";
import {RolesComponent} from "./roles/roles.component";
import {CrearRolComponent} from "./roles/crear-rol/crear-rol.component";
import {AreaJefeResponsComponent} from "./area-cargos-responsables/area-jefe-respons/area-jefe-respons.component";
import {
  CrearResponJefeAreaComponent
} from "./area-cargos-responsables/area-jefe-respons/crear-respon-jefe-area/crear-respon-jefe-area.component";
import {EditarPisoComponent} from "./area-cargos-responsables/piso-junical/editar-piso/editar-piso.component";
import {EditarTorreComponent} from "./area-cargos-responsables/torres-junical/editar-torre/editar-torre.component";
import {
  EditarCategoriaComponent
} from "./area-cargos-responsables/categoria-junical/editar-categoria/editar-categoria.component";
import {EditarCargoComponent} from "./area-cargos-responsables/carg-respons/editar-cargo/editar-cargo.component";
import {EditarAreaComponent} from "./area-cargos-responsables/area-respons/editar-area/editar-area.component";
import {EditarJefeComponent} from "./area-cargos-responsables/area-jefe-respons/editar-jefe/editar-jefe.component";
import {EditarZonaComponent} from "./area-cargos-responsables/zona-junical/editar-zona/editar-zona.component";
import {EditarRolComponent} from "./roles/editar-rol/editar-rol.component";
import {CrearRondaComponent} from "./RONDAS/crear-ronda/crear-ronda.component";
import {EditarUsuariosComponent} from "./auth/login-junical/usuarios-junical/editar-usuarios/editar-usuarios.component";
import {NotificacionesService} from "./area-cargos-responsables/Notificaciones/notificaciones.service";
import {
  NotificacionesJunicalComponent
} from "./area-cargos-responsables/Notificaciones/notificaciones-junical/notificaciones-junical.component";



export const routes: Routes = [
  // Ruta de inicio de sesión primero para acceso inicial
  { path: '', redirectTo: 'login-junical', pathMatch: 'full' }, // Redirigir al login
  { path: 'login-junical', component: LoginJunicalComponent },

  // Ruta de registro
  { path: 'register-junical', component: RegisterJunicalComponent },

  // Ruta del panel después de iniciar sesión correctamente (Falta estar protegido)
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [/* Agregue su guardia de autenticación aquí */], // Panel seguro
    children: [
      { path: '', component: DashboardComponent },
      { path: 'crear-ronda', component: CrearRondaComponent },

      {path:'piso-junical', component: PisoJunicalComponent},

      { path: 'torre-junical', component: TorresJunicalComponent, // Componente principal para torre-junical
        children: [
          { path: 'crear-torre', component: CrearTorreComponent }, // Ruta hija para crear torre
          { path: 'editar-torre/:id', component: EditarTorreComponent } // Ruta hija para editar torre con parámetro de id
        ]

      },
    ]
  },

  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Error routes (optional)
  //{ path: 'error-505', component: ServerErrorComponent },
  {path: 'crear-area',component: CrearAreaComponent},
  {path:'area-respons', component: AreaResponsComponent},
  {path:'editar-area/:id', component: EditarAreaComponent},
  {path: 'cargo-respons', component: CargResponsComponent},
  {path: 'crear-cargo', component: CrearCargoComponent},
  {path:'editar-cargo/:id',component: EditarCargoComponent},

  {path:'crear-piso',component:CrearPisoComponent},
  {path: 'editar-piso/:id', component: EditarPisoComponent},

  {path:'usuarios-junical', component: UsuariosJunicalComponent},
  {path: 'editar-usuario/:id', component: EditarUsuariosComponent},
  {path:'categoria-junical', component: CategoriaJunicalComponent},
  {path:'crear-categoria', component: CrearCategoriaComponent},
  {path:'editar-categoria/:id', component: EditarCategoriaComponent},
  {path: 'zona-junical', component: ZonaJunicalComponent},
  {path: 'crear-zona', component: CrearZonaComponent},
  {path: 'editar-zona/:id', component: EditarZonaComponent},
  {path: 'roles', component: RolesComponent},
  {path:'crear-rol', component: CrearRolComponent},
  {path:'editar-rol/:id', component: EditarRolComponent},
  {path:'respons-jefearea', component: AreaJefeResponsComponent},
  {path: 'crear-responjefearea', component: CrearResponJefeAreaComponent},
  {path: 'editar-jefe/:id', component: EditarJefeComponent},
  //Ronda Soporte
  //{path: 'crear-ronda',component: CrearRondaComponent},
  {path: 'notificaciones-junical', component: NotificacionesJunicalComponent},

  { path: '**', component: NopageFoundComponent }, // Comodín para rutas inigualables
];
