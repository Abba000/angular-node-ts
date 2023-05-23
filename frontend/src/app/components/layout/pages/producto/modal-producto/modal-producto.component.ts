import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/interfaces/categoria';
import { Producto } from 'src/app/interfaces/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/utilities/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent {
  formularioProducto: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  categorias: Categoria[] = [];
  id: number | undefined;

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioProducto = this.fb.group ({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      activo: ['', Validators.required],
    });

    this.id = data.idProducto;

    this._categoriaServicio.getCategorias().subscribe(data => {
      this.categorias = data
    })
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.tituloAccion = 'Editar ';
      this.botonAccion = 'Actualizar';
      this.getProducto(id);
    }
  }

  getProducto(id: number) {
    this._productoServicio.getProducto(id).subscribe((data: any) => {
      const producto: Producto = data[0];
      this.formularioProducto.setValue({
        nombre : producto.nombre,
        idCategoria : producto.idCategoria,
        stock : producto.stock,
        precio : producto.precio,
        activo : producto.activo.toString(),
      });
    });
  }

  guardarEditarProducto() {

    if (this.formularioProducto.invalid) {
      return;
    }

    const producto: Producto = {
      nombre : this.formularioProducto.value.nombre,
      idCategoria : this.formularioProducto.value.idCategoria,
      stock : this.formularioProducto.value.stock,
      precio : this.formularioProducto.value.precio,
      activo : this.formularioProducto.value.activo,
      nombreCategoria : this.formularioProducto.value.nombreCategoria,
    }

    if (this.id === undefined) {
      // Add
      this._productoServicio.createProducto(producto).subscribe(() => {
        this._utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
        this.modalActual.close("true");
      }, error => {
        this._utilidadServicio.mostrarAlerta("Error al registrar el producto: " + error.message, "Error");
      });
    } else {
      // Edit
      this._productoServicio.updateProducto(this.id, producto).subscribe(data => {
        this._utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
        this.modalActual.close("true");
      }, error => {
        this._utilidadServicio.mostrarAlerta("Error al editar el producto: " + error.message, "Error");
      });
    }
  }
}
