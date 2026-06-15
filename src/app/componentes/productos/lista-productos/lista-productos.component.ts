import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';

import { RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { CarritoService } from '../../../servicios/carrito.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { SeguridadService } from '../../../seguridad/seguridad.service';


@Component({
  selector: 'app-lista-productos',
  imports: [ListadoGenericoComponent, RouterLink, AutorizadoComponent, CurrencyPipe],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {


  @Input({ required: true })
  productos!: ProductoDTO[];

  carritoService = inject(CarritoService)
  seguridadService = inject(SeguridadService);


  @Output() productoBorrado = new EventEmitter<string>();

  borrar(id: string) {
    this.productoBorrado.emit(id);
  }


  usuarioLogeado(): boolean {

    this.seguridadService.estaLogueado()


    return this.seguridadService.estaLogueado();
  }

  agregarAlCarrito(id: string) {




    this.carritoService.agregarItem({ productoId: id, cantidad: 1 }).subscribe({
      next: () => {

        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          
        });

        Toast.fire({
          icon: "success",
          title: "Producto Agregado Al carrito",
         
        });

      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.error,
        });
      }
    });

  }
}
