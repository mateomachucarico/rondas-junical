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
import {AreaService} from "./area.service";
import * as ExcelJS from "exceljs";
import {LoadingService} from "../../Duplicados/loading.service";

interface ResponJefeArea {
  id: number;
  responName: string;
  responEmail: string;
  habilitado:boolean;
}
/*
interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}
interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;

}
*/

interface Area {
  id: number;
  areaName: string;
  habilitado: boolean;
  //torre: Torre;
  //piso: Piso;
  responJefeArea: ResponJefeArea;
}

interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  areaName: string;

}
@Component({
  providers:[AreaService, HttpClient, LoadingService],
  selector: 'app-area-respons',
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
  templateUrl: './area-respons.component.html',
  styleUrl: './area-respons.component.css'
})
export class AreaResponsComponent implements OnInit{

  //pisos: Piso[] = [];
  //torres: Torre[] = [];
  areas: Area[]=[];
  responJefeAreas: ResponJefeArea[] = [];
  area!: Area;
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // area Eliminar
  showAlert: boolean = false;
  areaToDelete: Area | null = null;
  areaEliminado: boolean = false;
  errorMessage: string | null = null;

  // area Inhabilitado
  showInhabilitarAlert: boolean = false;
  areaIdToInhabilitar: number | null = null;
  areaDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // area Habilitado
  areaIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  areaEnable: boolean = false;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private areaServicio: AreaService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.cargarAreas();
    //this.cargarTorres();
    //this.cargarPisos();
    this.cargarResponJefeArea();

    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);
  }
  //Imprimir
  printTable() {
    window.print();
  }
  onNuevaArea() {
    this.router.navigate(['/crear-area']); // Navega a la ruta 'nueva-area'
  }
  // Actualizar area
  onActualizarArea(area: Area) {
    const areaId = area.id;
    this.router.navigate(['/editar-area', areaId]);
  }
  protected readonly Math = Math;

  // Carga los datos de la base de datos.
  cargarAreas() {
    // Lógica para cargar los datos de la base de datos.
    this.areaServicio.recuperarTodosAreas().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.areas = data.map(area => {
          return {
            id: area.id,
            areaName: area.areaName,
            habilitado: area.habilitado,
            //torre: area.torre,
            //piso: area.piso,
            responJefeArea: area.responJefeArea
          };
        });
        this.totalPages = Math.ceil(this.areas.length / this.itemsPerPage);
        console.log("Datos de areas cargados correctamente:", this.areas);
      },
      error => {
        console.error('Error al cargar las areas:', error);
      }
    );
  }

  cargarResponJefeArea() {
    this.areaServicio.recuperarTodosResponJefeArea().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.responJefeAreas = data.map(responJefe => {
          return {
            id: responJefe.id,
            responName: responJefe.responName,
            responEmail: responJefe.responEmail,
            habilitado: responJefe.habilitado
          };
        });
        console.log("Datos de los responsables/jefes de área cargados correctamente:", this.responJefeAreas);
        if (this.responJefeAreas) {
          this.totalPages = Math.ceil(this.responJefeAreas.length / this.itemsPerPage);
        }
      },
      error => {
        console.error('Error al cargar los responsables/jefes de área:', error);
      }
    );
  }
  /*
  cargarTorres() {
    this.areaServicio.recuperarTodosTorres().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.torres = data.map(torre => {
          return {
            id: torre.id,
            torreName: torre.torreName,
            habilitado: torre.habilitado
          };
        });
        console.log("Datos de las torres cargados correctamente:", this.torres);
        if (this.torres) {
          this.totalPages = Math.ceil(this.torres.length / this.itemsPerPage);
        }
      },
      error => {
        console.error('Error al cargar las torres:', error);
      }
    );
  }
  cargarPisos() {
    this.areaServicio.recuperarTodosPisos().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.pisos = data.map(piso => {
          return {
            id: piso.id,
            pisoName: piso.pisoName,
            pisoNumber: piso.pisoNumber,

          };
        });
        console.log("Datos de los pisos cargados correctamente:", this.pisos);
        if (this.pisos) {
          this.totalPages = Math.ceil(this.pisos.length / this.itemsPerPage);
        }
      },
      error => {
        console.error('Error al cargar los pisos:', error);
      }
    );
  }
  */

  // Método para prepara Area para inhabilitación
  onInhabilitarArea(areaId: number) {
    // Guarda el ID de la area que se va a inhabilitar
    this.areaIdToInhabilitar = areaId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.areaIdToInhabilitar) {
      this.areaServicio.inhabilitarArea(this.areaIdToInhabilitar).subscribe(() => {
        const area = this.areas.find(t => t.id === this.areaIdToInhabilitar);
        if (area) {
          area['habilitado'] = false; // Actualizar el estado de la area a inhabilitado
        }
        this.areaIdToInhabilitar = null;
        this.areaDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.areaDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la area:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la area. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.areaIdToInhabilitar
    this.areaIdToInhabilitar = null;
  }
  onHabilitarArea(areaId: number) {
    // Guarda el ID de la area que se va a habilitar
    this.areaIdToHabilitar = areaId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.areaIdToHabilitar) {
      this.areaServicio.habilitarArea(this.areaIdToHabilitar).subscribe(() => {
        const area = this.areas.find(t => t.id === this.areaIdToHabilitar);
        if (area) {
          area['habilitado'] = true; // Actualizar el estado del area habilitado
        }
        this.areaIdToHabilitar = null;
        this.areaEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.areaEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la area:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la area. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.areaIdToHabilitar
    this.areaIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Areas');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'areaName', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}

    ];
    this.areas.forEach(area => {
      worksheet.addRow(area);
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
      this.areas.sort((a, b) => {
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
  onEliminarArea(area: Area) {
    // Guarda el area que se va a eliminar
    this.areaToDelete = area;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de areaEliminado
    this.areaEliminado = false;
  }
  confirmDelete() {
    if (this.areaToDelete) {
      this.showAlert = false;
      this.areaServicio.eliminarArea(this.areaToDelete.id).subscribe(() => {
        this.areas = this.areas.filter(p => p.id !== this.areaToDelete!.id);
        this.areaToDelete = null;
        this.areaEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.areaEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar el area:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar el area. Por favor, inténtalo de nuevo más tarde.';
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
    // Restablece el valor de this.areaToDelete
    this.areaToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { areaName: string; }) => {
        const itemText = item.areaName.toLowerCase();
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
