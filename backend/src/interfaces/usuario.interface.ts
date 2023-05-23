export interface Usuario {
    idUsuario?: number;
    nombreCompleto: string;
    correo: string;
    idRol: number;
    clave: string;
    activo: number;
    fechaRegistro: Date;
  }