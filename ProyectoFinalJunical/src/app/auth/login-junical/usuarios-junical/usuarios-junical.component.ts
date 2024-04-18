import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../../../area-cargos-responsables/filter.pipe";
import {UsuariosService} from "./usuarios.service";
import * as ExcelJS from "exceljs";
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
  habilitado: boolean;
  //[key: string]: boolean | number | string;

}
interface Item {
  id: number;
  username: string;

}
@Component({
  providers: [UsuariosService, HttpClient],
  selector: 'app-usuarios-junical',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgxPaginationModule,
    DecimalPipe,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCell,
    MatCellDef,
    NgbTooltip,
    NgbTooltipModule,
    FilterPipe
  ],
  templateUrl: './usuarios-junical.component.html',
  styleUrl: './usuarios-junical.component.css'
})
export class UsuariosJunicalComponent implements  OnInit{
  // Variables
  usuarioForm!: FormGroup;
  usuarios: Usuario [] = [];
  cargos: Cargo[]=[];
  areas: Area[]=[];
  roles: Rol[]=[];

  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // usuario Eliminar
  showAlert: boolean = false;
  usuarioToDelete: Usuario | null = null;
  usuarioEliminado: boolean = false;
  errorMessage: string | null = null;

  // usuario Inhabilitado
  showInhabilitarAlert: boolean = false;
  usuarioToInhabilitar: number | null = null;
  usuarioDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // usuario Habilitar
  usuarioToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  usuarioEnable: boolean = false;
  habilitarErrorMessage: string | null = null

  //búsqueda
  searchText: string = '';
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {

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
  printTable() {
    window.print();
  }
  onNuevaUsuarios() {
    this.router.navigate(['/register-junical']);
  }

  onActualizarUsuarios(usuario: Usuario) {
    const usuarioId = usuario.id;
    this.router.navigate(['/editar-usuario', usuarioId]);
  }
  protected readonly Math = Math;

  // Método para preparar los usuario para inhabilitación
  onInhabilitarUsuario(usuarioId: number) {
    // Guarda el usuario que se va a inhabilitar
    this.usuarioToInhabilitar = usuarioId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.usuarioToInhabilitar) {
      this.usuarioService.inhabilitarUsuario(this.usuarioToInhabilitar).subscribe(() => {
        const usuario  = this.usuarios.find(p => p.id === this.usuarioToInhabilitar);
        if (usuario){
          usuario['habilitado'] = false;
        }
        this.usuarioToInhabilitar = null;
        this.usuarioDisable = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.usuarioDisable = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al Inhabilitar el usuario:', error);
        // Mostrar mensaje de error al instante
        this.inhabilitarErrorMessage = 'Hubo un error al Inhabilitar el usuario. Por favor, inténtalo de nuevo más tarde.';
        // Ocultar el modal después de 8 segundos
        setTimeout(() => {
          this.showInhabilitarAlert = false;
        }, 8000);
      });
      this.showInhabilitarAlert = false;
    }
  }
  cancelInhabilitar() {
    // Cierra la alerta
    this.showInhabilitarAlert = false;
    // Restablece el valor de this.usuarioToInhabilitar
    this.usuarioToInhabilitar = null;
  }
  onHabilitarUsuario(usuarioId: number) {
    // Guarda el usuario que se va a habilitado
    this.usuarioToHabilitar = usuarioId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.usuarioToHabilitar) {
      this.usuarioService.habilitarUsuario(this.usuarioToHabilitar).subscribe(() => {
        const usuario  = this.usuarios.find(p =>p.id === this.usuarioToInhabilitar);
        if (usuario){
          usuario['habilitado'] = true;
        }
        this.usuarioToHabilitar = null;
        this.usuarioEnable = true; // Mostrar mensaje de habilitacion correcta
        setTimeout(() => {
          this.usuarioEnable = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el usuario:', error);
        // Mostrar mensaje de error al instante
        this.habilitarErrorMessage = 'Hubo un error al habilitar el usuario. Por favor, inténtalo de nuevo más tarde.';
        // Ocultar el modal después de 8 segundos
        setTimeout(() => {
          this.showHabilitarAlert = false;
        }, 8000);
      });
      // Cierra el modal después de confirmar
      this.showHabilitarAlert = false;
    }
  }
  cancelHabilitar() {
    // Cierra la alerta
    this.showHabilitarAlert = false;
    // Restablece el valor de this.usuarioToInhabilitar
    this.usuarioToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'username', width: 30},
      {header: 'Correo', key: 'email', width: 30},
      {header: 'Identificación', key: 'identificacion', width: 15},
      {header: 'Celular', key: 'celular', width: 15},
      {header: 'Rol', key: 'rol', width: 15},
      {header: 'Cargo', key: 'cargo', width: 15},
      {header: 'Area', key: 'area', width: 15},
      {header: 'Habilitado', key: 'habilitado', width: 15}
    ];

    this.usuarios.forEach(usuario => {
      worksheet.addRow(usuario);
    });

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  sortColumn(columnName: string) {
    if (this.currentColumn === columnName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentColumn = columnName;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }
  sortData() {
    if (this.currentColumn) {
      this.usuarios.sort((a, b) => {
        const aValue = (a as any)[this.currentColumn];
        const bValue = (b as any)[this.currentColumn];
        if (aValue < bValue) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }

  onEliminarUsuario(usuario: Usuario) {
    // Guarda el usuario que se va a eliminar
    this.usuarioToDelete = usuario;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de usuarioEliminado
    this.usuarioEliminado = false;
  }
  confirmDelete() {
    if (this.usuarioToDelete) {
      this.showAlert = false;
      this.usuarioService.eliminarUsuario(this.usuarioToDelete.id).subscribe(() => {
        this.usuarios = this.usuarios.filter(p => p.id !== this.usuarioToDelete!.id);
        this.usuarioToDelete = null;
        this.usuarioEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.usuarioEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el usuario:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.';
        // Ocultar el modal después de 8 segundos
        setTimeout(() => {
          this.showAlert = false;
        }, 8000);
      });
    }
  }
  cancelDelete() {
    // Cierra la alerta
    this.showAlert = false;
    // Restablece el valor de this.usuarioToDelete
    this.usuarioToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { username: string; }) => {
        const itemText = item.username.toLowerCase();
        return searchKeywords.every(keyword => itemText.includes(keyword));
      });
      this.searchNotFound = this.filteredItems.length === 0;
      this.updateTable();
    } else {
      this.displayedItems = [];
      this.searchNotFound = false;
    }
  }
  updateTable() {
    this.displayedItems = this.filteredItems;
  }
  highlightMatches(content: string, keyword: string): string {
    if (!keyword.trim()) return content;
    const regex = new RegExp(keyword, 'gi');
    return content.replace(regex, match => `<span class="highlight">${match}</span>`);
  }
}
//lo voy a programar con angular utilizando la plantilla adminLTE
