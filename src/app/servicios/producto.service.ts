import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../interfaces/iServicioCrud';
import { AgregarMasProductosDTO, ProductoCreacionDTO, ProductoDTO, ProductoHistorial } from '../modelos/ProductoModelos/Producto';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements IServicioCRUD<ProductoDTO, ProductoCreacionDTO> {


  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Producto'


  constructor() { }



  public obtenerTodos(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.urlBase}/ObtenerProductos`);

  }

  public filtrar(x: any): Observable<HttpResponse<ProductoDTO[]>> {
    const params = new HttpParams({ fromObject: x });

    return this.http.get<ProductoDTO[]>(`${this.urlBase}/Filtrar`, { params, observe: 'response' });
  }

  public filtrarLanding(x: any): Observable<HttpResponse<ProductoDTO[]>> {
    const params = new HttpParams({ fromObject: x });


    return this.http.get<ProductoDTO[]>(`${this.urlBase}/FiltrarLanding`, { params, observe: 'response' });
  }

  public obtenerPorId(id: string): Observable<ProductoDTO> {
    return this.http.get<ProductoDTO>(`${this.urlBase}/${id}`);

  }
  public actualizar(id: string, producto: ProductoCreacionDTO): Observable<any> {
    const formData = this.construirFormData(producto);

    return this.http.put(`${this.urlBase}/${id}`, formData)



  }
  public crear(producto: ProductoCreacionDTO): Observable<any> {
    const formData = this.construirFormData(producto);
    return this.http.post(this.urlBase, formData);
  }

  public borrar(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`)
  }


  //Utilizamos formData para archivos-imagenes 
  private construirFormData(producto: ProductoCreacionDTO): FormData {


    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    if (producto.descripcion) formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio.toString());
    if (producto.imagenUrl) formData.append('imagenUrl', producto.imagenUrl);
    if (producto.categoriaId) formData.append('categoriaId', producto.categoriaId);
    formData.append('stock', producto.stock.toString());
    return formData;

  }


  public agregarStock(id: string, entidad: AgregarMasProductosDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, entidad)

  }


  public aprobarProducto(id: string): Observable<any> {
    return this.http.put(`${this.urlBase}/aprobar/${id}`, {});
  }


  public rechazarProducto(id: string): Observable<any> {
    return this.http.put(`${this.urlBase}/rechazar/${id}`, {});
  }

  // 🔹 PENDIENTES (solo Admin)

  public obtenerPendientes(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.urlBase}/Pendientes`);
  }

  // 🔹 HISTORIAL DE UN PRODUCTO

  public obtenerHistorialDeProducto(id: string): Observable<ProductoHistorial> {
    return this.http.get<ProductoHistorial>(`${this.urlBase}/${id}/historial`);
  }

  // 🔹 HISTORIAL DE TODOS LOS PRODUCTOS

  public obtenerHistorialGeneral(): Observable<ProductoHistorial[]> {
    return this.http.get<ProductoHistorial[]>(`${this.urlBase}/HistorialProductos`);
  }

  public ObtenerPendientes(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.urlBase}/Pendientes`);


  }


}
