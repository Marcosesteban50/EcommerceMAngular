import { EstadoPago } from "./OrdenEnums";

export interface OrdenDTO {
    id: string;
    fecha: string;
    total: number;
    direccionEnvio: string;
    emailUsuario: string;
    estadoOrdenId: string;
    estadoPagoId: string;
    estadoOrden: EstadoOrdenDTO;
    estadoPago: EstadoPagoDTO;
    items: OrdenItemDTO[];
}

export interface OrdenCreacionDTO {
    
    estadoOrdenId: string;
    estadoPagoId: string;

}


export interface OrdenItemDTO {
    productoId: string;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
}

export interface EstadoOrdenDTO {
    id: string;
    nombre: string;
}

export interface EstadoPagoDTO {
    id: string;
    nombre: string;

}

export interface EstadoOrdenCreacionDTO {

    nombre: string;
}

export interface EstadoPagoCreacionDTO {

    nombre: string;
}











