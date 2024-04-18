import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from "../filter.pipe";
import {ResponJefeAreaService} from "./respon-jefe-area.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as ExcelJS from "exceljs";


interface Area
{
  id: number;
  areaName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface Cargo
{
  id: number;
  cargoName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  area: Area;
  cargo: Cargo;
  //responFirma: string;
  habilitado:boolean;
  [key: string]: any;

}
interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  responName: string;

}
@Component({
  providers: [ResponJefeAreaService, HttpClient],
  selector: 'app-area-jefe-respons',
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
  templateUrl: './area-jefe-respons.component.html',
  styleUrl: './area-jefe-respons.component.css'
})
export class AreaJefeResponsComponent implements  OnInit{
  protected responJefeArea!: ResponJefeArea;
  responJefeAreas: ResponJefeArea[]=[];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // ResponJefeArea Eliminar
  showAlert: boolean = false;
  responJefeAreaToDelete: ResponJefeArea | null = null;
  responJefeAreaEliminado: boolean = false;
  errorMessage: string | null = null;

  // ResponJefeArea Inhabilitado
  showInhabilitarAlert: boolean = false;
  responJefeAreaIdToInhabilitar: number | null = null;
  responJefeAreaDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // ResponJefeArea Habilitado
  responJefeAreaIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  responJefeAreaEnable: boolean = false;
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
    private responJefeAreaServicio: ResponJefeAreaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarResponJefeAreas();
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
  //Nuevo responJefeAreaId
  onNuevaResponJefeArea() {
    this.router.navigate(['/crear-responjefearea']);
  }
  // Actualizar responJefeAResponJefeArea
  onActualizarResponJefeArea(responJefeArea: ResponJefeArea) {
    const responJefeAreaId = responJefeArea.id;
    this.router.navigate(['/editar-jefe', responJefeAreaId]);
  }
  protected readonly Math = Math;
  private column: any;

  // Carga los datos de la base de datos.
  cargarResponJefeAreas() {
    // Lógica para cargar los datos de la base de datos.
    this.responJefeAreaServicio.recuperarTodosResponJefeAreas().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.responJefeAreas = data.map(responJefeArea => {
          return {
            id: responJefeArea.id,
            responName: responJefeArea.responName,
            responEmail: responJefeArea.responEmail,
            area: responJefeArea.area,
            cargo: responJefeArea.cargo,
            //responFirma: responJefeArea.responFirma,
            habilitado: responJefeArea.habilitado, // Almacena directamente el valor de habilitado
          };
        });
        this.totalPages = Math.ceil(this.responJefeAreas.length / this.itemsPerPage);
        console.log("Datos de los jefes de area cargados correctamente:", this.responJefeAreas);
      },
      error => {
        console.error('Error al cargar jefes de area:', error);
        console.error('Error al cargar jefes de area:', error);
      }
    );
  }
  // Método para preparar la inhabilitación
  onInhabilitarResponJefeArea(responJefeAreaId: number) {
    // Guarda el ID de la responJefeArea que se va a inhabilitar
    this.responJefeAreaIdToInhabilitar = responJefeAreaId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.responJefeAreaIdToInhabilitar) {
      this.responJefeAreaServicio.inhabilitarResponJefeArea(this.responJefeAreaIdToInhabilitar).subscribe(() => {
        const responJefeArea = this.responJefeAreas.find(t => t.id === this.responJefeAreaIdToInhabilitar);
        if (responJefeArea) {
          responJefeArea['habilitado'] = false; // Actualizar el estado de la responJefeArea a inhabilitado
        }
        this.responJefeAreaIdToInhabilitar = null;
        this.responJefeAreaDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.responJefeAreaDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la ResponJefeArea:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la ResponJefeArea. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.ResponJefeAreaIdToInhabilitar
    this.responJefeAreaIdToInhabilitar = null;
  }
  onHabilitarResponJefeArea(responJefeAreaId: number) {
    // Guarda el ID de la ResponJefeArea que se va a habilitar
    this.responJefeAreaIdToHabilitar = responJefeAreaId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.responJefeAreaIdToHabilitar) {
      this.responJefeAreaServicio.habilitarResponJefeArea(this.responJefeAreaIdToHabilitar).subscribe(() => {
        const responJefeArea = this.responJefeAreas.find(t => t.id === this.responJefeAreaIdToHabilitar);
        if (responJefeArea) {
          responJefeArea['habilitado'] = true; // Actualizar el estado del responJefeArea habilitado
        }
        this.responJefeAreaIdToHabilitar = null;
        this.responJefeAreaEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.responJefeAreaEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la responJefeArea:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la responJefeArea. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.responJefeAreaIdToHabilitar
    this.responJefeAreaIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ResponJefeAreas');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'responName', width: 30},
      {header: 'Email', key: 'responEmail', width: 30},
      {header: 'Area', key: 'responArea', width: 30},
      {header: 'Cargo', key: 'responCargo', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}
    ];
    this.responJefeAreas.forEach(responJefeArea => {
      worksheet.addRow(responJefeArea);
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
      this.responJefeAreas.sort((a, b) => {
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
  onEliminarResponJefeArea(responJefeArea: ResponJefeArea) {
    // Guarda el responJefeArea que se va a eliminar
    this.responJefeAreaToDelete = responJefeArea;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de responJefeAreaEliminado
    this.responJefeAreaEliminado = false;
  }
  confirmDelete() {
    if (this.responJefeAreaToDelete) {
      this.showAlert = false;
      this.responJefeAreaServicio.eliminarResponJefeArea(this.responJefeAreaToDelete.id).subscribe(() => {
        this.responJefeAreas = this.responJefeAreas.filter(p => p.id !== this.responJefeAreaToDelete!.id);
        this.responJefeAreaToDelete = null;
        this.responJefeAreaEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.responJefeAreaEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el responJefeArea:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el responJefeArea. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.responJefeAreaToDelete
    this.responJefeAreaToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { responName: string; }) => {
        const itemText = item.responName.toLowerCase();
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
