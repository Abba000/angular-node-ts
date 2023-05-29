import { Component, Inject, inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from 'src/app/interfaces/venta';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrls: ['./modal-detalle-venta.component.css']
})
export class ModalDetalleVentaComponent {

  fechaRegistro: string = '';
  numeroDocumento: string = '';
  // tipoPago: string = '';
  total: string = '';
  detalleVenta: DetalleVenta[] = [];
  columnasTabla: string[] = ['producto', 'cantidad', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Venta) {

    this.fechaRegistro = data.fechaRegistro!;
    this.numeroDocumento = data.numeroDoucmento!;
    // this.tipoPago = data.tipoPago;
    this.total = data.totalTexto;
    this.detalleVenta = data.detalleVenta;
  }

}
