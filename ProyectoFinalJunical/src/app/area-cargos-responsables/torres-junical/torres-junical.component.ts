import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {TorresService} from "./torres.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import * as ExcelJS from 'exceljs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPipe} from "../filter.pipe";


interface Torre {
  id: number;
  torreName: string;
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
  torreName: string;

}
@Component({
  providers: [TorresService, HttpClient],
  selector: 'app-torres-junical',
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
  ],
  templateUrl: './torres-junical.component.html',
  styleUrl: './torres-junical.component.css'
})
export class TorresJunicalComponent implements OnInit {
  protected torre!: Torre;
  torres: Torre[] = [];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // torre Eliminar
  showAlert: boolean = false;
  torreToDelete: Torre | null = null;
  torreEliminado: boolean = false;
  errorMessage: string | null = null;

  // torre Inhabilitado
  showInhabilitarAlert: boolean = false;
  torreIdToInhabilitar: number | null = null;
  torreDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // torre Habilitado
  torreIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  torreEnable: boolean = false;
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
    private torresServicio: TorresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.cargarTorres();
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
  //Nueva Torre
  onNuevaTorre() {
    this.router.navigate(['crear-torre']);
  }
  // Actualizar torre
  onActualizarTorre(torre: Torre) {
    const torreId = torre.id;
    this.router.navigate(['editar-torre', torreId]);
  }
  protected readonly Math = Math;
  private column: any;

  // Carga los datos de la base de datos.
  cargarTorres() {
    // Lógica para cargar los datos de la base de datos.
    this.torresServicio.recuperarTodosTorres().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.torres = data.map(torre => {
          return {
            id: torre.id,
            torreName: torre.torreName,
            habilitado: torre.habilitado, // Almacena directamente el valor de habilitado
          };
        });
        this.totalPages = Math.ceil(this.torres.length / this.itemsPerPage);

        console.log("Datos de torres cargados correctamente:", this.torres);
      },
      error => {
        console.error('Error al cargar las torres:', error);
        console.error('Error al cargar las torres:', error);
      }
    );
  }
  // Método para preparar la torre para inhabilitación
  onInhabilitarTorre(torreId: number) {
    // Guarda el ID de la torre que se va a inhabilitar
    this.torreIdToInhabilitar = torreId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.torreIdToInhabilitar) {
      this.torresServicio.inhabilitarTorre(this.torreIdToInhabilitar).subscribe(() => {
        const torre = this.torres.find(t => t.id === this.torreIdToInhabilitar);
        if (torre) {
          torre['habilitado'] = false; // Actualizar el estado de la torre a inhabilitado
        }
        this.torreIdToInhabilitar = null;
        this.torreDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.torreDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la torre:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la torre. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.torreIdToInhabilitar
    this.torreIdToInhabilitar = null;
  }
  onHabilitarTorre(torreId: number) {
    // Guarda el ID de la torre que se va a habilitar
    this.torreIdToHabilitar = torreId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.torreIdToHabilitar) {
      this.torresServicio.habilitarTorre(this.torreIdToHabilitar).subscribe(() => {
        const torre = this.torres.find(t => t.id === this.torreIdToHabilitar);
        if (torre) {
          torre['habilitado'] = true; // Actualizar el estado de la torre habilitado
        }
        this.torreIdToHabilitar = null;
        this.torreEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.torreEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la torre:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la torre. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.torreIdToHabilitar
    this.torreIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Torres');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'torreName', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}

    ];
    this.torres.forEach(torre => {
      worksheet.addRow(torre);
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
      this.torres.sort((a, b) => {
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
  onEliminarTorre(torre: Torre) {
    // Guarda el torre que se va a eliminar
    this.torreToDelete = torre;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de torreEliminado
    this.torreEliminado = false;
  }
  confirmDelete() {
    if (this.torreToDelete) {
      this.showAlert = false;
      this.torresServicio.eliminarTorre(this.torreToDelete.id).subscribe(() => {
        this.torres = this.torres.filter(p => p.id !== this.torreToDelete!.id);
        this.torreToDelete = null;
        this.torreEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.torreEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el torre:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el torre. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.torreToDelete
    this.torreToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { torreName: string; }) => {
        const itemText = item.torreName.toLowerCase();
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





