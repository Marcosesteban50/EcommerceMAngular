import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SeguridadService } from '../seguridad/seguridad.service';
import { FavoritoDTO } from '../modelos/FavoritoModelos/FavoritoDTO';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {


  private http = inject(HttpClient);
  private apiURL = environment.apiURL + '/Favorito';
  private seguridad = inject(SeguridadService);
  private cantidadFavoritoSource = new BehaviorSubject<number>(0);
  cantidadFavoritos$ = this.cantidadFavoritoSource.asObservable();






  actualizarCantidad() {

    if (this.seguridad.estaLogueado()) {
      this.obtenerFavoritos().subscribe(x => {
        this.cantidadFavoritoSource.next(x.items.length);
      });

    }

    return;
  }



  // Obtener lista del backend
  obtenerFavoritos() {

    if (this.seguridad.estaLogueado()) {


      return this.http.get<FavoritoDTO>(this.apiURL);
    }



    return of();

  }

  // Agregar item a la lista
  agregarItem(dto: { productoId: string, nombre?: string, precio?: number, imagen?: string }) {


    if (this.seguridad.estaLogueado()) {
      return this.http.post(this.apiURL + '/AgregarItem', dto).pipe(tap(() => {
        this.actualizarCantidad();
      }));
    }

    return of();



  }


  // Eliminar un producto de la lista
  eliminarItem(productoId: string) {




    return this.http.delete(this.apiURL + `/Eliminar/${productoId}`).pipe(tap(() => {
      this.actualizarCantidad();
    }));



  }


  // Vaciar todo la lista
  vaciarLista() {

    return this.http.delete(this.apiURL + '/Vaciar');

  }






}
