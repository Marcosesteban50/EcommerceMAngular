import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CarritoDTO, CarritoItemDTO } from '../modelos/CarritoModelos/CarritoDTO';
import { SeguridadService } from '../seguridad/seguridad.service';
import { BehaviorSubject, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  private http = inject(HttpClient);
  private apiURL = environment.apiURL + '/Carrito';
  private seguridad = inject(SeguridadService);


  private storageKey = 'carritoInvitado';
  private cantidadCarritoSource = new BehaviorSubject<number>(0);

  cantidadCarrito$ = this.cantidadCarritoSource.asObservable();

  actualizarCantidad() {

    if (this.seguridad.estaLogueado()) {
      this.obtenerCarrito().subscribe(x => {
        this.cantidadCarritoSource.next(x.items.length);
      });

      return;
    }

    const carrito = this.obtenerCarritoLocal().items;

    this.cantidadCarritoSource.next(carrito.length);
  }


  private obtenerCarritoLocal() {

    //obtenemos carrito
    const data = localStorage.getItem(this.storageKey);

    //convertimos data a JSOn
    const items = data ? JSON.parse(data) : [];

    const total = items.reduce((acc: number, item: any) => {
      return acc + item.precio * item.cantidad;
    }, 0);

    return { items, total };
  }

  private guardarCarritoLocal(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Obtener carrito del backend
  obtenerCarrito() {

    if (this.seguridad.estaLogueado()) {

      return this.http.get<CarritoDTO>(this.apiURL);
    }



    const carrito = this.obtenerCarritoLocal();

    //Mapeamos de carritoLocal a CarritoDTO para traer propiedades
    const carritoTransformado: CarritoDTO = {
      id: '',
      total: carrito.total,
      items: carrito.items.map((item: any) => ({
        productoId: item.productoId,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad,
        imagenUrl: item.imagenUrl
      }))
    };


    //of devuelve observable
    return of(carritoTransformado);

  }

  // Agregar item al carrito
  agregarItem(dto: { productoId: string, cantidad: number, nombre?: string, precio?: number, imagen?: string }) {


    if (this.seguridad.estaLogueado()) {

      return this.http.post(this.apiURL + '/AgregarItem', dto).pipe(tap(() => {
        this.actualizarCantidad();
      }));

    }


    const carrito = this.obtenerCarritoLocal().items;

    const itemExiste = carrito.find((x: any) => x.productoId === dto.productoId);


    if (itemExiste) {
      //Si existe le sumamos a la cantidad del produto
      itemExiste.cantidad += dto.cantidad;
    } else {
      //Si no existe lo agregamos
      carrito.push({
        productoId: dto.productoId,
        nombre: dto.nombre,
        precio: dto.precio,
        imagenUrl: dto.imagen,
        cantidad: dto.cantidad
      });
    }


    this.guardarCarritoLocal(carrito);

    this.actualizarCantidad();

    return of({ ok: true })
  }


  // Eliminar un producto del carrito
  eliminarItem(productoId: string) {

    if (this.seguridad.estaLogueado()) {



      return this.http.delete(this.apiURL + `/Eliminar/${productoId}`).pipe(tap(() => {
        this.actualizarCantidad();
      }));
    }

    let carrito = this.obtenerCarritoLocal().items;

    carrito = carrito.filter((x: any) => x.productoId !== productoId);

    this.guardarCarritoLocal(carrito);
    this.actualizarCantidad();


    return of({ ok: true });

  }

  eliminarUnaUnidad(productoId: string) {

    if (this.seguridad.estaLogueado()) {



      return this.http.delete(`${this.apiURL}/EliminarUno/${productoId}`)
        .pipe(tap(() => {
          this.actualizarCantidad();
        }));
    }

    let carrito = this.obtenerCarritoLocal().items;

    const item = carrito.find((x: any) => x.productoId === productoId);

    if (item) {
      item.cantidad--;

      if (item.cantidad <= 0) {
        carrito = carrito.filter((x: any) => x.productoId !== productoId);
      }
    }

    this.guardarCarritoLocal(carrito);

    this.actualizarCantidad();


    return of({ ok: true });

  }


  // Vaciar todo el carrito
  vaciarCarrito() {

    if (this.seguridad.estaLogueado()) {

      return this.http.delete(this.apiURL + '/Vaciar').pipe(tap(() => {
        this.actualizarCantidad();
      }));

    }

    localStorage.removeItem(this.storageKey);

    this.actualizarCantidad();


    return of({ ok: true })

  }


  sincronizarCarritoInvitado() {
    //Obtenemos carrito local
    const carritoLocal = this.obtenerCarritoLocal().items;

    //SI es nulo no hacemos nada
    if (!carritoLocal || carritoLocal.length === 0) {
      return of({ ok: true });
    }

    // Aquí estoy recorriendo el carrito y creando un nuevo array
    // con solo lo que el backend necesita: productoId y cantidad
    const items = carritoLocal.map((item: any) => ({
      productoId: item.productoId,
      cantidad: item.cantidad
    }));

    return this.http.post(`${this.apiURL}/Sincronizar`, items);
  }

  limpiarCarritoInvitado() {
    localStorage.removeItem(this.storageKey);
  }


}
