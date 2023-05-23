export interface Venta {
    idVenta?: number;
    numeroDocumento: string;
    tipoPago: string;
    total: number;
    fechaRegistro: Date;
}