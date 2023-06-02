import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { UtilidadService } from 'src/app/utilities/utilidad.service';

import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {

  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];
  listaProductosParaVenta: DetalleVenta[] = [];

  bloquearBotonRegistrar: boolean = false;
  productoSeleccionado!: Producto;
  tipoPagoPorDefecto: string = "Efectivo";
  totalPagar: number = 0;

  formularioProductoVenta: FormGroup;
  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total', 'accion'];
  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

  retornarProductosPorFiltro(busqueda: any): Producto[] {
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLowerCase() : busqueda.target?.value?.toLowerCase() || '';
    return this.listaProductos.filter(item => item.nombre.toLowerCase().includes(valorBuscado));
  }

  constructor(
    private fb: FormBuilder,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioProductoVenta = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
    })

    this._productoServicio.getProductos().subscribe(data => {
      this.listaProductos = data.filter(x => x.activo === 1 && x.stock > 0);
    })

    this.formularioProductoVenta.get('producto')?.valueChanges.subscribe(data => {
      if (data !== undefined) {
        this.listaProductosFiltro = this.retornarProductosPorFiltro(data);
      }
    })        
  }

  mostrarProducto(producto: Producto): string {
    return producto.nombre;
  }

  productoParaVenta(event: any) {
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaVenta() {
    const _cantidad: number = this.formularioProductoVenta.value.cantidad;
    const _precio: number = parseFloat(this.productoSeleccionado.precio);
    const _total: number = _cantidad * _precio;
    this.totalPagar = this.totalPagar + _total;

    this.listaProductosParaVenta.push({
      idProducto : this.productoSeleccionado.idProducto || 0,
      descripcionProducto : this.productoSeleccionado.nombre,
      cantidad : _cantidad,
      precioTexto : String(_precio.toFixed(2)),
      totalTexto : String(_total.toFixed(2)),
    })

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

    this.formularioProductoVenta.patchValue({
      producto: '',
      cantidad: ''
    })
  }

  eliminarProducto(detalle: DetalleVenta) {
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(p => p.idProducto != detalle.idProducto);
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto);
    
    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
  }

  

  registrarVenta() {
    if(this.listaProductosParaVenta.length > 0) {
      this.bloquearBotonRegistrar = true;

      const request: Venta = {
        numeroDoucmento: "1",
        tipoPago: this.tipoPagoPorDefecto,
        totalTexto: this.totalPagar.toFixed(2),
        detalleVenta: this.listaProductosParaVenta
      }

      console.log(request);

      this._ventaServicio.createVenta(request).subscribe(
        () => {
          this.totalPagar = 0.00;
          this.listaProductosParaVenta = [];
          this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

          Swal.fire({
            icon: 'success',
            title: 'Venta Registrada!',
            text: 'La venta ha sido registrada exitosamente.' + request.numeroDoucmento
          });
        },
        (error) => {
          this._utilidadServicio.mostrarAlerta("No se pudo registrar la venta", "Error");
        }
      );  
    }
  }
}
