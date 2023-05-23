export interface DetalleVenta {
    idDetalleVenta?: number;
    idVenta: number;
    idProducto: number;
    cantidad: number;
    precio: number;
    total: number;
}