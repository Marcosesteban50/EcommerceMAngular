export interface FavoritoDTO {
  id: string;
  items: FavoritoItemDTO[];
  total: number;
}

export interface FavoritoItemDTO {
  productoId: string;
  nombre: string;
  precio: number;
  subtotal:number;
  imagenUrl: string; //Esto puede dar problemas
}


