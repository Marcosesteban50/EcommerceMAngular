import { CategoriaDTO } from "../CategoriaModelos/Categoria";


export interface ProductoDTO {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoriaId?: string;
  categoria?: CategoriaDTO; 
  stock: number;
  usuarioId?: string; 
  aprobado: boolean;
}


export interface ProductoCreacionDTO{
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: File;
  categoriaId?: string;
  stock: number;
}


export interface AgregarMasProductosDTO{
  stock:number;
}


export interface ProductoHistorial{
  id:string;
  productoId:string;
  usuarioId:string;
  usuarioNombre:string;
  categoria?: CategoriaDTO; 
  categoriaId?: string;
  imagenUrl?:string;
  accion:string;
  datosAntes:string;
  datosDespues:string;
  fechaCreacion:Date;
}