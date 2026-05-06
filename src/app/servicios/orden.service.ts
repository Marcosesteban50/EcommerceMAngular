import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EstadoOrdenCreacionDTO, EstadoOrdenDTO, EstadoPagoCreacionDTO, EstadoPagoDTO, OrdenCreacionDTO, OrdenDTO } from '../modelos/OrdenModelos/Orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {


  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Ordenes'

  constructor() { }


  //Obteniendo Ordenes-Estados
  obtenerOrdenes(): Observable<OrdenDTO[]> {
    return this.http.get<OrdenDTO[]>(`${this.urlBase}/TodasLasOrdenes`)
  }

  obtenerEstadosOrden(): Observable<EstadoOrdenDTO[]> {
    return this.http.get<EstadoOrdenDTO[]>(`${this.urlBase}/EstadosOrdenes`)
  }

  obtenerEstadosPagos(): Observable<EstadoPagoDTO[]> {
    return this.http.get<EstadoPagoDTO[]>(`${this.urlBase}/EstadosPagos`)
  }




  //Confirmar Compra Carrito
  confirmarCompra(direccionEnvio: string) {
    return this.http.post(`${this.urlBase}/ConfirmarCompra`, { direccionEnvio });
  }

  //Obteniendo Orden por su Id
  public obtenerOrdenPorId(id: string): Observable<OrdenDTO> {
    return this.http.get<OrdenDTO>(`${this.urlBase}/${id}`);

  }

  //Obteniendo estados por su Id
  public obtenerEstadoOrdenPorId(id: string): Observable<EstadoOrdenDTO> {
    return this.http.get<EstadoOrdenDTO>(`${this.urlBase}/${id}/EstadoOrden`);

  }


  public obtenerEstadoPagoPorId(id: string): Observable<EstadoPagoDTO> {
    return this.http.get<EstadoPagoDTO>(`${this.urlBase}/${id}/EstadoPago`);

  }



  public EditarOrden(id: string, entidad: OrdenCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, entidad);
  }

  //Editar Estados
  public EditarEstadoOrden(id: string, entidad: EstadoOrdenCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/EditarEstadoOrden/${id}`, entidad)
  }

  public EditarEstadoPago(id: string, entidad: EstadoPagoCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/EditarEstadoPago/${id}`, entidad)
  }



  //Crear Estados
  public crearEstadoOrden(entidad: EstadoOrdenCreacionDTO): Observable<any> {
    return this.http.post(`${this.urlBase}/CrearEstadoOrden`, entidad);

  }

  public crearEstadoPago(entidad: EstadoPagoCreacionDTO): Observable<any> {
    return this.http.post(`${this.urlBase}/CrearEstadoPago`, entidad);

  }



  //Borrar Estados
  public borrarEstadoOrden(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/BorrarEstadoOrden/${id}`)
  }

  public borrarEstadoPago(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/BorrarEstadoPago/${id}`)
  }





}
