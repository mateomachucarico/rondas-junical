import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../filter.pipe";
import * as ExcelJS from "exceljs";
import {ZonaService} from "./zona.service";


interface Zona {
  id: number;
  zonaName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  zonaName: string;


}
@Component({
  providers: [ZonaService, HttpClient],
  selector: 'app-zona-junical',
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
  templateUrl: './zona-junical.component.html',
  styleUrl: './zona-junical.component.css'
})
export class ZonaJunicalComponent implements OnInit{
  protected zona!: Zona;
  zonas: Zona[] = [];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // zona Eliminar
  showAlert: boolean = false;
  zonaToDelete: Zona | null = null;
  zonaEliminado: boolean = false;
  errorMessage: string | null = null;

  // zona Inhabilitado
  showInhabilitarAlert: boolean = false;
  zonaIdToInhabilitar: number | null = null;
  zonaDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // zona Habilitado
  zonaIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  zonaEnable: boolean = false;
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
    private router: Router,
    private zonaServicio: ZonaService,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.cargarZonas();
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
  //Nueva zona
  onNuevaZona() {
    this.router.navigate(['/crear-zona']);
  }
  //Actualizar zona
  onActualizarZona(zona: Zona) {
    const zonaId = zona.id;
    this.router.navigate(['/editar-zona', zonaId]);
  }

  protected readonly Math = Math;
  private column: any;

  // Carga los datos de la base de datos
  cargarZonas() {
    // Lógica para cargar los datos de la base de datos.
    this.zonaServicio.recuperarTodosZonas().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.zonas = data.map(zona => {
          return {
            id: zona.id,
            zonaName: zona.zonaName,
            habilitado: zona.habilitado, // Almacena directamente el valor de habilitado
          };
        });
        this.totalPages = Math.ceil(this.zonas.length / this.itemsPerPage);
        console.log("Datos de las zonas cargados correctamente:", this.zonas);
      },
      error => {
        console.error('Error al cargar las zonas:', error);
      }
    );
  }
  // Método para preparar el zona para inhabilitación
  onInhabilitarZona(zonaId: number) {
    // Guarda el ID de la zona que se va a inhabilitar
    this.zonaIdToInhabilitar = zonaId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.zonaIdToInhabilitar) {
      this.zonaServicio.inhabilitarZona(this.zonaIdToInhabilitar).subscribe(() => {
        const zona = this.zonas.find(t => t.id === this.zonaIdToInhabilitar);
        if (zona) {
          zona['habilitado'] = false; // Actualizar el estado de la zona a inhabilitado
        }
        this.zonaIdToInhabilitar = null;
        this.zonaDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.zonaDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la zona:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la zona. Por favor, inténtalo de nuevo más tarde.';
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
    this.zonaIdToInhabilitar = null;
  }
  onHabilitarZona(zonaId: number) {
    // Guarda el ID de la zona que se va a habilitar
    this.zonaIdToHabilitar = zonaId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.zonaIdToHabilitar) {
      this.zonaServicio.habilitarZona(this.zonaIdToHabilitar).subscribe(() => {
        const zona = this.zonas.find(t => t.id === this.zonaIdToHabilitar);
        if (zona) {
          zona['habilitado'] = true; // Actualizar el estado de la zona habilitado
        }
        this.zonaIdToHabilitar = null;
        this.zonaEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.zonaEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la zona:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la zona. Por favor, inténtalo de nuevo más tarde.';
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
    this.zonaIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Zonas');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'zonaName', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}

    ];
    this.zonas.forEach(zona => {
      worksheet.addRow(zona);
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
      this.zonas.sort((a, b) => {
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

  onEliminarZona(zona: Zona) {
    // Guarda el zona que se va a eliminar
    this.zonaToDelete = zona;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de zonaEliminado
    this.zonaEliminado = false;
  }
  confirmDelete() {
    if (this.zonaToDelete) {
      this.showAlert = false;
      this.zonaServicio.eliminarZona(this.zonaToDelete.id).subscribe(() => {
        this.zonas = this.zonas.filter(p => p.id !== this.zonaToDelete!.id);
        this.zonaToDelete = null;
        this.zonaEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.zonaEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el zona:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el zona. Por favor, inténtalo de nuevo más tarde.';
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
    this.zonaToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { zonaName: string; }) => {
        const itemText = item.zonaName.toLowerCase();
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
