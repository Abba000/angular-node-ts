export interface Producto {
    idProducto?: number;
    nombre: string;
    idCategosria: number;
    stock: number;
    precio: number;
    activo: number;
    fechaRegistro: Date;
}