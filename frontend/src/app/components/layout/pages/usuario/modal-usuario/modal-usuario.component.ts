import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';

import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/utilities/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent {
  formularioUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  roles: Rol[] = [];
  id: number | undefined;

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    
    this.formularioUsuario = this.fb.group({
      nombreCompleto : ['', Validators.required],
      correo : ['', Validators.required],
      idRol : ['', Validators.required],
      clave : ['', Validators.required],
      activo : ['', Validators.required],
    });

    this.id = data.idUsuario;

    this._rolServicio.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.tituloAccion = 'Editar ';
      this.botonAccion = 'Actualizar';
      this.getUsuario(id);
    }
  }

  getUsuario(id: number) {
    this._usuarioServicio.getUsuario(id).subscribe((data: any) => {
      const usuario: Usuario = data[0];
      this.formularioUsuario.setValue({
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
        idRol: usuario.idRol,
        clave: usuario.clave,
        activo: usuario.activo.toString(),
      });
    });
  }

  guardarEditarUsuario() {
    
    if (this.formularioUsuario.invalid) {
      return;
    }

    const usuario: Usuario = {
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      correo: this.formularioUsuario.value.correo,
      idRol: this.formularioUsuario.value.idRol,
      clave: this.formularioUsuario.value.clave,
      activo: this.formularioUsuario.value.activo,
      nombreRol: this.formularioUsuario.value.nombreRol,
    }

    if (this.id === undefined) {
      // Add
      this._usuarioServicio.createUsuario(usuario).subscribe(() => {
        this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Exito");
        this.modalActual.close("true");
      }, error => {
        this._utilidadServicio.mostrarAlerta("Error al registrar el usuario: " + error.message, "Error");
      });
    } else {
      // Edit
      this._usuarioServicio.updateUsuario(this.id, usuario).subscribe(data => {
        this._utilidadServicio.mostrarAlerta("El usuario fue editado", "Exito");
        this.modalActual.close("true");
      }, error => {
        this._utilidadServicio.mostrarAlerta("Error al editar el usuario: " + error.message, "Error");
      });
    }
  }
}
