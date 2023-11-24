import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  typesOfShoes: any[] = [
    { nombre: 'Camiseta', tipo: '', color: ' Blanco', precio: 15.99 },
    { nombre: 'Taza', tipo: '', color: ' Rojo', precio: 8.99 },
    { nombre: 'Buzos', tipo: '', color: ' Negro', precio: 29.99 },
    { nombre: 'Gorras', tipo: '', color: ' Azul', precio: 12.99 },
  ];

  selectedShoe: any;

  tiposDeMaterial: string[] = ['Algodón', 'Lino', 'Poliéster', 'Seda'];

  coloresDisponibles: string[] = ['Blanco', 'Rojo', 'Negro', 'Azul'];

  mostrarDatosCliente: boolean = false;
  cantidadEnCarrito: number = 0;
  montoAPagar: number = 0;

  // Formulario para los datos del cliente y el monto
  datosClienteForm: FormGroup;

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.datosClienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required], // Nuevo campo para Apellido
      direccion: ['', Validators.required], // Nuevo campo para Dirección de Entrega
      monto: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]]
    });
  }

  mostrarCaracteristicas(shoesList: MatSelectionList) {
    const selectedOption = shoesList.selectedOptions.selected[0];

    if (selectedOption) {
      const selectedValue = selectedOption.value;
      this.selectedShoe = this.typesOfShoes.find(shoe => shoe.nombre === selectedValue);
      this.calcularMontoAPagar();
    } else {
      this.selectedShoe = null;
      this.montoAPagar = 0;
      this.datosClienteForm.get('monto')?.setValue(0);
    }
  }

  agregarAlCarrito() {
    this.cantidadEnCarrito++;
    const mensaje = `Producto agregado al carrito: ${this.selectedShoe.nombre}`;
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  comprar() {
    if (this.selectedShoe) {
      this.mostrarDatosCliente = true;
    } else {
      this.mostrarDatosCliente = false;
      this.resetearSeleccion();
    }
  }

  resetearSeleccion() {
    this.selectedShoe = null;
    this.montoAPagar = 0;
    this.datosClienteForm.get('monto')?.setValue(0);
    this.calcularMontoAPagar();
  } 
  

  // Cambiado a público
  calcularMontoAPagar() {
    if (this.selectedShoe) {
      this.montoAPagar = this.selectedShoe.precio;
      this.datosClienteForm.get('monto')?.setValue(this.montoAPagar);
    } else {
      this.montoAPagar = 0;
    }
  }

  getCantidadEnCarrito() {
    return this.cantidadEnCarrito;
  }

  calcularMonto() {
    return this.montoAPagar;
  }

  realizarPago() {
    // Lógica para procesar el pago con los datos del formulario
    const mensaje = `Pago realizado con éxito. Gracias, ${this.datosClienteForm.value.nombre}!`;
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  
    // Restablecer el formulario a su estado inicial
    this.datosClienteForm.reset();
    this.datosClienteForm.get('monto')?.setValue(0);
    this.cantidadEnCarrito = 0;
    this.mostrarDatosCliente = false;
  
    // Restablecer la selección de características del producto
    this.selectedShoe = null;
    this.montoAPagar = 0;
  
    // Actualizar el formulario y el monto a pagar después de restablecer la selección
    this.calcularMontoAPagar();
  }
  
}
