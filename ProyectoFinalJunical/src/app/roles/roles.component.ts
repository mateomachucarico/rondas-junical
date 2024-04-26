import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesService} from "./roles.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../area-cargos-responsables/filter.pipe";
import * as ExcelJS from "exceljs";
import {LoadingService} from "../Duplicados/loading.service";

interface Rol {
  id: number;
  rolName: string;
  rolDescripc: string;
  rolFechaCreac: Date;
  rolFechaModic: Date;
  habilitado: boolean;
}
interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  rolName: string;
}
@Component({
  providers: [RolesService, HttpClient, LoadingService],
  selector: 'app-roles',
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
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements  OnInit{
  rol!: Rol;
  roles: Rol [] = [];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // rol Eliminar
  showAlert: boolean = false;
  rolToDelete: Rol | null = null;
  rolEliminado: boolean = false;
  errorMessage: string | null = null;

  // rol Inhabilitado
  showInhabilitarAlert: boolean = false;
  rolToInhabilitar: number | null = null;
  rolDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // rol Habilitar
  rolToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  rolEnable: boolean = false;
  habilitarErrorMessage: string | null = null

  //búsqueda
  searchText: string = '';
  searchHistory: SearchHistoryItem[] = [];
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private rolesService: RolesService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) { }
  ngOnInit(): void {
    this.cargarRoles();
    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);
  }
  printTable() {
    window.print();
  }
  onNuevaRol() {
    this.router.navigate(['/crear-rol']);
  }
// Actualizar Rol
  onActualizarRol(rol: Rol) {
    const rolId = rol.id;
    this.router.navigate(['/editar-rol', rolId]);
  }
  protected readonly Math = Math;

  // Carga los datos de la base de datos.
  cargarRoles() {
    // Lógica para cargar los roles desde el servicio
    this.rolesService.recuperarTodosLosRoles().subscribe(
      data => {
        this.roles = data.map(rol => {
          return {
            id: rol.id,
            rolName: rol.rolName,
            rolDescripc: rol.rolDescripc,
            rolFechaCreac: rol.rolFechaCreac,
            rolFechaModic: rol.rolFechaModic,
            habilitado: rol.habilitado,
          };
        });
        this.totalPages = Math.ceil(this.roles.length / this.itemsPerPage);
      },
      error => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }
  // Método para preparar los roles para inhabilitación
  onInhabilitarRol(rolId: number) {
    // Guarda el rol que se va a inhabilitar
    this.rolToInhabilitar = rolId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.rolToInhabilitar) {
      this.rolesService.inhabilitarRol(this.rolToInhabilitar).subscribe(() => {
        const rol = this.roles.find(p => p.id === this.rolToInhabilitar);
        if (rol) {
          rol['habilitado'] = false;
        }
        this.rolToInhabilitar = null;
        this.rolDisable = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.rolDisable = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al Inhabilitar el rol:', error);
        // Mostrar mensaje de error al instante
        this.inhabilitarErrorMessage = 'Hubo un error al Inhabilitar el rol. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.rolToInhabilitar
    this.rolToInhabilitar = null;
  }
  onHabilitarRol(rolId: number) {
    // Guarda el rol que se va a habilitado
    this.rolToHabilitar = rolId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.rolToHabilitar) {
      this.rolesService.habilitarRol(this.rolToHabilitar).subscribe(() => {
        const rol = this.roles.find(p => p.id === this.rolToHabilitar);
        if (rol) {
          rol['habilitado'] = true;
        }
        this.rolToHabilitar = null;
        this.rolEnable = true; // Mostrar mensaje de habilitacion correcta
        setTimeout(() => {
          this.rolEnable = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al habilitar el rol:', error);
        // Mostrar mensaje de error al instante
        this.habilitarErrorMessage = 'Hubo un error al habilitar el rol. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.rolToInhabilitar
    this.rolToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Roles');

    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'rolName', width: 30},
      {header: 'Descripción', key: 'rolDescripc', width: 30},
      {header: 'Fecha de creación', key: 'rolFechaCreac', width: 15},
      {header: 'Fecha de Modificación', key: 'rolFechaModic', width: 15},
      {header: 'Habilitado', key: 'habilitado', width: 15}
    ];

    this.roles.forEach(rol => {
      worksheet.addRow(rol);
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
      this.roles.sort((a, b) => {
        const aValue = a.id;
        const bValue = b.id;
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
  onEliminarRol(rol: Rol) {
    // Guarda el rol que se va a eliminar
    this.rolToDelete = rol;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de rolEliminado
    this.rolEliminado = false;
  }
  confirmDelete() {
    if (this.rolToDelete) {
      this.showAlert = false;
      this.rolesService.eliminarRol(this.rolToDelete.id).subscribe(() => {
        console.log('Rol eliminado:', this.rolToDelete); // Registrar el rol eliminado en la consola
        this.roles = this.roles.filter(p => p.id !== this.rolToDelete!.id);
        this.rolToDelete = null;
        this.rolEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.rolEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el rol:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el rol. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.rolToDelete
    this.rolToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { rolName: string; }) => {
        const itemText = item.rolName.toLowerCase();
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
