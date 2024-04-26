import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule, DecimalPipe, NgForOf, NgIf } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { PisoService } from "./crear-piso/piso.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import * as ExcelJS from 'exceljs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../filter.pipe";
import {LoadingService} from "../../Duplicados/loading.service";
import {TorresService} from "../torres-junical/torres.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}


interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
  torre: Torre;
}
interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  pisoName: string;
}
@Component({
  providers: [PisoService, HttpClient, LoadingService, TorresService],
  selector: 'app-piso-junical',
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
  templateUrl: './piso-junical.component.html',
  styleUrl: './piso-junical.component.css'
})
export class PisoJunicalComponent implements OnInit {

  piso!: Piso;
  pisos: Piso[] = [];
  torres: Torre[] = [];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  collectionSize: number = 0;

  // piso Eliminar
  showAlert: boolean = false;
  pisoToDelete: Piso | null = null;
  pisoEliminado: boolean = false;
  errorMessage: string | null = null;

  // piso Inhabilitado
  showInhabilitarAlert: boolean = false;
  pisoToInhabilitar: number | null = null;
  pisoDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // Piso Habilitado
  pisoToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  pisoEnable: boolean = false;
  habilitarErrorMessage: string | null = null

//búsqueda
  searchText: string = '';
  searchHistory: SearchHistoryItem[] = [];
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private pisoService: PisoService,
    private torreService: TorresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.cargarPisos();
    this.cargarTorres();
    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);
  }
  printTable() {
    window.print();
  }
  onNuevaPiso() {
    this.router.navigate(['/crear-piso']);
  }
  // Actualizar piso
  onActualizarPiso(piso: Piso) {
    const pisoId = piso.id;
    this.router.navigate(['/editar-piso', pisoId]);
  }
  protected readonly Math = Math;

// Carga los datos de la base de datos.
  cargarPisos() {
    this.pisoService.recuperarTodosPisos()
      .pipe(
        catchError(error => {
          console.error('Error al cargar los pisos:', error);
          this.errorMessage = 'Error al cargar los pisos. Intente nuevamente.';
          return of([]);
        })
      )
      .subscribe(pisos => {
        this.pisos = pisos;
        this.collectionSize = pisos.length;
        this.totalPages = Math.ceil(this.collectionSize / this.itemsPerPage);
      });
  }

  // Llama a esta función para cargar las torres

  cargarTorres(): void {
    this.torreService.recuperarTodosTorres().subscribe(
      (torres: Torre[]) => {
        this.torres = torres;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  exportToExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Pisos');

  worksheet.columns = [
    {header: 'ID', key: 'id', width: 10},
    {header: 'Nombre', key: 'pisoName', width: 30},
    {header: 'Descripción', key: 'pisoDescripc', width: 30},
    {header: 'Numero de Piso', key: 'pisoNumber', width: 15},
    {header: 'Torre', key: 'torre', width: 15},

  ];

  this.pisos.forEach(piso => {
    worksheet.addRow(piso);
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
    this.pisos.sort((a, b) => {
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
onEliminarPiso(piso: Piso) {
  // Guarda el piso que se va a eliminar
  this.pisoToDelete = piso;
  // Muestra la alerta
  this.showAlert = true;
  // Restablece el estado de pisoEliminado
  this.pisoEliminado = false;
}
confirmDelete() {
  if (this.pisoToDelete) {
    this.showAlert = false;
    this.pisoService.eliminarPiso(this.pisoToDelete.id).subscribe(() => {
      this.pisos = this.pisos.filter(p => p.id !== this.pisoToDelete!.id);
      this.pisoToDelete = null;
      this.pisoEliminado = true; // Mostrar mensaje de eliminación correcta
      setTimeout(() => {
        this.pisoEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
      }, 3000);
    }, error => {
      console.error('Error al eliminar el piso:', error);
      // Mostrar mensaje de error al instante
      this.errorMessage = 'Hubo un error al eliminar el piso. Por favor, inténtalo de nuevo más tarde.';
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
  // Restablece el valor de this.pisoToDelete
  this.pisoToDelete = null;
}
performSearch() {
  if (this.searchText.trim() !== '') {
    const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
    this.filteredItems = this.items.filter((item: { pisoName: string; }) => {
      const itemText = item.pisoName.toLowerCase();
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

