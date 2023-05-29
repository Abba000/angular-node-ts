import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { DetalleVentaComponent } from './pages/detalle-venta/detalle-venta.component';

const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children: [
    //{path:'dashboard', component:DashBoardComponent},
    {path:'usuarios', component:UsuarioComponent},
    {path:'productos', component:ProductoComponent},
    {path:'venta', component:VentaComponent},
    {path:'historial-venta', component:DetalleVentaComponent},
    //{path:'reportes', component:ReporteComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
