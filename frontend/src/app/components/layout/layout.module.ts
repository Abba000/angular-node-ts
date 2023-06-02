import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ModalUsuarioComponent } from './pages/usuario/modal-usuario/modal-usuario.component';
import { ModalProductoComponent } from './pages/producto/modal-producto/modal-producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalleVentaComponent } from './pages/detalle-venta/detalle-venta.component';
import { ModalDetalleVentaComponent } from './pages/detalle-venta/modal-detalle-venta/modal-detalle-venta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    ProductoComponent,
    ModalUsuarioComponent,
    ModalProductoComponent,
    VentaComponent,
    HomeComponent,
    DetalleVentaComponent,
    ModalDetalleVentaComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
