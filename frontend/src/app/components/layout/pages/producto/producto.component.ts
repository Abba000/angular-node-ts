import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/utilities/utilidad.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: [
    './producto.component.css',
    '../../../../app.component.css'
  ]
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones'];
  producto: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.producto);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService,
  ){}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
    this.dataListaProductos.sort = this.sort;
  }

  obtenerProductos() {
    this.loading = true;
    this._productoServicio.getProductos().subscribe(data => {
      this.loading = false;
      this.dataListaProductos.data = data;
      this.dataListaProductos.paginator = this.paginacionTabla;
      this.dataListaProductos.sort = this.sort;
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }

  modalProducto(id?: number) {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: { idProducto: id }  
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerProductos();
      }
    });
  }

  eliminarProducto(id: number, producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        this.loading = true;
        this._productoServicio.deleteProducto(id).subscribe(() => {
          this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "Exito");
          this.obtenerProductos();
          this.loading = false;
        }, error => {
          this._utilidadServicio.mostrarAlerta("Error al eliminar el producto" + error.message, "Error");
        });
      }
    })
  }

}
