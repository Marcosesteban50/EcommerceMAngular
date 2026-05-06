export interface FiltroProductos {
      nombre: string;
      precioMin: number;
      precioMax: number;
      categoriaId: string;
      Stock: boolean;

}

export interface FiltroProductosNombre{
      nombre:string;
      categoriaId: string;
      precioMin:boolean;
      precioMax:boolean;
      Stock:boolean;
}