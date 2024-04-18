import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'filterBy'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!value || !searchTerm) {
      return value;
    }

    // Implementa tu lógica de filtrado.
    return value.filter(item =>
      (item.torreName && item.torreName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.pisoName && item.pisoName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.categName && item.categName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.cargoName && item.cargoName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.areaName && item.areaName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.responName && item.responName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.zonaName && item.zonaName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.rolName && item.rolName.toLowerCase().includes(searchTerm.toLowerCase()))||
      (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase()))


    );
  }
}
