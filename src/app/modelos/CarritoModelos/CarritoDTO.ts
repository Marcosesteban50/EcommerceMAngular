export interface CarritoDTO {
  id: string;
  items: CarritoItemDTO[];
  total: number;
}

export interface CarritoItemDTO {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  imagenes: string[]; //Esto puede dar problemas
}
