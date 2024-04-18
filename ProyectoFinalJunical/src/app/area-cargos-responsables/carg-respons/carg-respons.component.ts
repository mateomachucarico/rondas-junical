import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CargoService} from "./cargo.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../filter.pipe";
import * as ExcelJS from 'exceljs';

interface Cargo {
  id: number;
  cargoName: string;
  cargoDescrips: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}

interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  cargoName: string;

}
@Component({
  providers: [CargoService, HttpClient],
  selector: 'app-carg-respons',
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
    FilterPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './carg-respons.component.html',
  styleUrl: './carg-respons.component.css'
})
export class CargResponsComponent implements OnInit{
  protected cargo!: Cargo;
  cargos: Cargo[]=[];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // Cargo Eliminar
  showAlert: boolean = false;
  cargoToDelete: Cargo | null = null;
  cargoEliminado: boolean = false;
  errorMessage: string | null = null;

  // Cargo Inhabilitado
  showInhabilitarAlert: boolean = false;
  cargoIdToInhabilitar: number | null = null;
  cargoDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // Cargo Habilitado
  cargoIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  cargoEnable: boolean = false;
  habilitarErrorMessage: string | null = null

  //búsqueda
  searchText: string = '';
  searchHistory: SearchHistoryItem[] = [];
  items: Item[] = []; // Asegúrate de inicializar o cargar tus datos aquí
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cargoServicio: CargoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarCargos();
    document.addEventListener('DOMContentLoaded', () => {
      const loader = document.getElementById('loader') as HTMLDivElement;
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
  //Imprimir
  printTable() {
    window.print();
  }
  //Nuevo Cargo
  onNuevaCargo() {
    this.router.navigate(['/crear-cargo']);
  }
  // Actualizar cargo
  onActualizarCargo(cargo: Cargo) {
    const cargoId = cargo.id;
    this.router.navigate(['/editar-cargo', cargoId]);
  }
  protected readonly Math = Math;
  private column: any;

  // Carga los datos de la base de datos.
  cargarCargos() {
    // Lógica para cargar los datos de la base de datos.
    this.cargoServicio.recuperarTodosCargos().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.cargos = data.map(cargo => {
          return {
            id: cargo.id,
            cargoName: cargo.cargoName,
            cargoDescrips: cargo.cargoDescrips,
            habilitado: cargo.habilitado, // Almacena directamente el valor de habilitado
          };
        });
        this.totalPages = Math.ceil(this.cargos.length / this.itemsPerPage);
        console.log("Datos de cargos cargados correctamente:", this.cargos);
      },
      error => {
        console.error('Error al cargar las cargos:', error);
        console.error('Error al cargar las cargos:', error);
      }
    );
  }
  // Método para preparar el cargo para inhabilitación
  onInhabilitarCargo(cargoId: number) {
    // Guarda el ID de la cargo que se va a inhabilitar
    this.cargoIdToInhabilitar = cargoId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.cargoIdToInhabilitar) {
      this.cargoServicio.inhabilitarCargo(this.cargoIdToInhabilitar).subscribe(() => {
        const cargo = this.cargos.find(t => t.id === this.cargoIdToInhabilitar);
        if (cargo) {
          cargo['habilitado'] = false; // Actualizar el estado de la cargo a inhabilitado
        }
        this.cargoIdToInhabilitar = null;
        this.cargoDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.cargoDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la cargo:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la cargo. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.cargoIdToInhabilitar
    this.cargoIdToInhabilitar = null;
  }
  onHabilitarCargo(cargoId: number) {
    // Guarda el ID de la cargo que se va a habilitar
    this.cargoIdToHabilitar = cargoId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.cargoIdToHabilitar) {
      this.cargoServicio.habilitarCargo(this.cargoIdToHabilitar).subscribe(() => {
        const cargo = this.cargos.find(t => t.id === this.cargoIdToHabilitar);
        if (cargo) {
          cargo['habilitado'] = true; // Actualizar el estado del cargo habilitado
        }
        this.cargoIdToHabilitar = null;
        this.cargoEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.cargoEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la cargo:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la cargo. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.cargoIdToHabilitar
    this.cargoIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cargos');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'cargoName', width: 30},
      {header: 'Descripcion', key: 'cargoDescrips', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}

    ];
    this.cargos.forEach(cargo => {
      worksheet.addRow(cargo);
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
      this.cargos.sort((a, b) => {
        const aValue = a[this.currentColumn];
        const bValue = b[this.currentColumn];
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
  onEliminarCargo(cargo: Cargo) {
    // Guarda el Cargo que se va a eliminar
    this.cargoToDelete = cargo;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de CargoEliminado
    this.cargoEliminado = false;
  }
  confirmDelete() {
    if (this.cargoToDelete) {
      this.showAlert = false;
      this.cargoServicio.eliminarCargo(this.cargoToDelete.id).subscribe(() => {
        this.cargos = this.cargos.filter(p => p.id !== this.cargoToDelete!.id);
        this.cargoToDelete = null;
        this.cargoEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.cargoEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el cargo:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el cargo. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.cargoToDelete
    this.cargoToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { cargoName: string; }) => {
        const itemText = item.cargoName.toLowerCase();
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
