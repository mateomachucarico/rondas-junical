import {Component, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "./categoria.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import * as ExcelJS from "exceljs";
import {FilterPipe} from "../filter.pipe";
import {NgxPaginationModule} from "ngx-pagination";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {LoadingService} from "../../Duplicados/loading.service";
interface Categoria {
  id: number;
  categName: string;
  habilitado:boolean;

}

interface SearchHistoryItem {
  // Define la estructura de un elemento del historial de búsqueda
  query: string;
  timestamp: Date;
}
interface Item {
  id: number;
  categName: string;


}
@Component({
  providers: [CategoriaService, HttpClient, LoadingService],
  selector: 'app-categoria-junical',
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
  templateUrl: './categoria-junical.component.html',
  styleUrl: './categoria-junical.component.css'
})
export class CategoriaJunicalComponent implements  OnInit {
  protected categoria!: Categoria;
  categorias: Categoria[] = [];
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc';

  // categoria Eliminar
  showAlert: boolean = false;
  categoriaToDelete: Categoria | null = null;
  categoriaEliminado: boolean = false;
  errorMessage: string | null = null;

  // categoria Inhabilitado
  showInhabilitarAlert: boolean = false;
  categoriaIdToInhabilitar: number | null = null;
  categoriaDisable: boolean = false;
  inhabilitarErrorMessage: string | null = null

  // categoria Habilitado
  categoriaIdToHabilitar: number | null = null;
  showHabilitarAlert: boolean = false;
  categoriaEnable: boolean = false;
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
    private categoriaServicio: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.cargarCategorias();
    // Ocultar el cargador y mostrar el contenido después de un tiempo
    setTimeout(() => {
      this.loadingService.hideLoader();
    }, 1000);
  }
  //Imprimir
  printTable() {
    window.print();
  }
  //Nueva categoria
  onNuevaCategorias() {
    this.router.navigate(['/crear-categoria']);
  }
  //Actualizar categoria
  onActualizarCategoria(categoria: Categoria) {
    const categoriaId = categoria.id;
    this.router.navigate(['/editar-categoria', categoriaId]);
  }

  protected readonly Math = Math;

  // Carga los datos de la base de datos.
  cargarCategorias() {
    // Lógica para cargar los datos de la base de datos.
    this.categoriaServicio.recuperarTodosCategorias().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.categorias = data.map(categoria => {
          return {
            id: categoria.id,
            categName: categoria.categName,
            habilitado: categoria.habilitado, // Almacena directamente el valor de habilitado
          };
        });
        this.totalPages = Math.ceil(this.categorias.length / this.itemsPerPage);
        console.log("Datos de las categorias cargados correctamente:", this.categorias);
      },
      error => {
        console.error('Error al cargar las categorias:', error);
      }
    );
  }
  // Método para preparar el categoria para inhabilitación
  onInhabilitarCategoria(categoriaId: number) {
    // Guarda el ID de la categoria que se va a inhabilitar
    this.categoriaIdToInhabilitar = categoriaId;
    // Muestra la alerta
    this.showInhabilitarAlert = true;
  }
  confirmInhabilitado() {
    if (this.categoriaIdToInhabilitar) {
      this.categoriaServicio.inhabilitarCategoria(this.categoriaIdToInhabilitar).subscribe(() => {
        const categoria = this.categorias.find(t => t.id === this.categoriaIdToInhabilitar);
        if (categoria) {
          categoria['habilitado'] = false; // Actualizar el estado de la categoria a inhabilitado
        }
        this.categoriaIdToInhabilitar = null;
        this.categoriaDisable = true; // Mostrar mensaje de inhabilitación correcta
        setTimeout(() => {
          this.categoriaDisable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al inhabilitar la categoria:', error);
        this.inhabilitarErrorMessage = 'Hubo un error al inhabilitar la categoria. Por favor, inténtalo de nuevo más tarde.';
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
    this.categoriaIdToInhabilitar = null;
  }
  onHabilitarCategoria(categoriaId: number) {
    // Guarda el ID de la categoria que se va a habilitar
    this.categoriaIdToHabilitar = categoriaId;
    // Muestra la alerta
    this.showHabilitarAlert = true;
  }
  confirmHabilitar() {
    if (this.categoriaIdToHabilitar) {
      this.categoriaServicio.habilitarCategotia(this.categoriaIdToHabilitar).subscribe(() => {
        const categoria = this.categorias.find(t => t.id === this.categoriaIdToHabilitar);
        if (categoria) {
          categoria['habilitado'] = true; // Actualizar el estado de la categoria habilitado
        }
        this.categoriaIdToHabilitar = null;
        this.categoriaEnable = true; // Mostrar mensaje de habilitación correcta
        setTimeout(() => {
          this.categoriaEnable = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000);
      }, error => {
        console.error('Error al habilitar la categoria:', error);
        this.habilitarErrorMessage = 'Hubo un error al habilitar la categoria. Por favor, inténtalo de nuevo más tarde.';
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
    this.categoriaIdToHabilitar = null;
  }
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Categorias');
    worksheet.columns = [
      {header: 'ID', key: 'id', width: 10},
      {header: 'Nombre', key: 'categName', width: 30},
      {header: 'Habilitado', key: 'habilitado', width: 15}

    ];
    this.categorias.forEach(categoria => {
      worksheet.addRow(categoria);
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
      this.categorias.sort((a, b) => {
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

  onEliminarCategoria(categoria: Categoria) {
    // Guarda el categoria que se va a eliminar
    this.categoriaToDelete = categoria;
    // Muestra la alerta
    this.showAlert = true;
    // Restablece el estado de categoriaEliminado
    this.categoriaEliminado = false;
  }
  confirmDelete() {
    if (this.categoriaToDelete) {
      this.showAlert = false;
      this.categoriaServicio.eliminarCategoria(this.categoriaToDelete.id).subscribe(() => {
        console.log('Categoría eliminada:', this.categoriaToDelete); // Registrar la categoría eliminada en la consola
        this.categorias = this.categorias.filter(p => p.id !== this.categoriaToDelete!.id);
        this.categoriaToDelete = null;
        this.categoriaEliminado = true; // Mostrar mensaje de eliminación correcta
        setTimeout(() => {
          this.categoriaEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
        }, 3000);
      }, error => {
        console.error('Error al eliminar la categoría:', error);
        // Mostrar mensaje de error al instante
        this.errorMessage = 'Hubo un error al eliminar la categoría. Por favor, inténtalo de nuevo más tarde.';
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
    this.categoriaToDelete = null;
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { categName: string; }) => {
        const itemText = item.categName.toLowerCase();
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
