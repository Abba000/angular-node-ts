import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/utilities/utilidad.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: [
    './usuario.component.css', 
    '../../../../app.component.css'
  ]
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombreCompleto', 'correo', 'nombreRol', 'estado', 'acciones'];
  usuario: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.usuario);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
  ){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
    this.dataListaUsuarios.sort = this.sort;
  }

  obtenerUsuarios() {
    this.loading = true;
    this._usuarioServicio.getUsuarios().subscribe(data => {
      this.loading = false;
      this.dataListaUsuarios.data = data;
      this.dataListaUsuarios.paginator = this.paginacionTabla;
      this.dataListaUsuarios.sort = this.sort;
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  modalUsuario(id?: number) {
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: { idUsuario: id }  
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerUsuarios();
      }
    });
  }

  eliminarUsuario(id: number, usuario: Usuario) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: usuario.nombreCompleto,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      
      if(resultado.isConfirmed) {
        this.loading = true;
        this._usuarioServicio.deleteUsuario(id).subscribe(() => {
          this._utilidadServicio.mostrarAlerta("El usuario fue eliminado", "Exito");
          this.obtenerUsuarios();
          this.loading = false;
        }, error => {
          this._utilidadServicio.mostrarAlerta("Error al eliminar el usuario" + error.message, "Error");
        });
      }
    })
  }
  
}
