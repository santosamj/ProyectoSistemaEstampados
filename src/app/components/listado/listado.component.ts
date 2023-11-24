import { Component } from '@angular/core';

export interface Producto {
  producto: string;
  material: string;
  estampado: string;
  subliminado: string;
  precio: number;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  productos: Producto[] = [
    { producto: 'Camiseta', material: 'Algodón, Lino, Poliester y Seda', estampado: 'Sí', subliminado: 'Sí', precio: 15.99 },
    { producto: 'Taza', material: 'Cerámica', estampado: 'Sí', subliminado: 'No', precio: 8.99 },  // Nuevo producto
    // Puedes agregar más productos según sea necesario
  ];
}
