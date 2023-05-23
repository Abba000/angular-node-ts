import { DetalleVenta } from "./detalle-venta";

export interface Venta {
    idVenta?: number,
    numeroDoucmento?: string,
    tipoPago: string,
    fechaRegistro?: string,
    totalTexto: string,
    detalleVenta: DetalleVenta[]
}
