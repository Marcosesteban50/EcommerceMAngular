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
      precioMin:number;
      precioMax:number;
      Stock?:boolean;
}