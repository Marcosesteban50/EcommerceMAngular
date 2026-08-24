import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';

import { Router, RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { CarritoService } from '../../../servicios/carrito.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { SeguridadService } from '../../../seguridad/seguridad.service';
import { FavoritoService } from '../../../servicios/favorito.service';


@Component({
  selector: 'app-lista-productos',
  imports: [ListadoGenericoComponent, RouterLink, AutorizadoComponent, CurrencyPipe],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {


  ngOnInit(): void {
    this.obtenerFavoritos();
  }


  @Input({ required: true })
  productos!: ProductoDTO[];






  private router = inject(Router);
  favoritos = new Set<string>();
  favoritoService = inject(FavoritoService);
  carritoService = inject(CarritoService)
  seguridadService = inject(SeguridadService);


  @Output() productoBorrado = new EventEmitter<string>();

  borrar(id: string) {
    this.productoBorrado.emit(id);
  }

  obtenerFavoritos() {
    this.favoritoService.obtenerFavoritos().subscribe({
      //Atrapamos la respuesta en next del backend si fue exitosa
      next: (respuesta) => {

        //quitamos todos  los elementos de favoritos Set<>()
        this.favoritos.clear();

        //Recorremos cada valor de favoritos
        for (const i of respuesta.items) {
          this.favoritos.add(i.productoId);
        }

        console.log('Favoritos', this.favoritos);
      },

      error: (error) => {

        console.error('Error obteniendo favoritos:', error);

      }
    })
  }








  toggleFavorito(producto: any) {



    if (this.usuarioLogeado()) {
      // Si YA está en favoritos → eliminarlo
      if (this.esFavorito(producto.id)) {

        this.favoritoService.eliminarItem(producto.id).subscribe({

          next: () => {

            // Lo quitamos del Set local
            this.favoritos.delete(producto.id);

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,

            });


            Toast.fire({
              icon: "info",
              title: "Producto Eliminado de la lista",

            });
          },
          error: (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.error,
            });
            console.error('Error eliminando favorito:', e);
          }



        });

      }

      // Si NO está en favoritos → agregarlo
      else {

        this.favoritoService.agregarItem({
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagenUrl
        }).subscribe({

          next: () => {

            // Lo agregamos al Set local
            this.favoritos.add(producto.id);


            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,

            });


            Toast.fire({
              icon: "success",
              title: "Producto Agregado a lista",

            });
          },
          error: (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.error,
            });
            console.error('Error eliminando favorito:', e);
          }

        });

      }
    } else {

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,

      });


      Toast.fire({
        icon: 'error',
        title: 'No estás logueado',
        text: 'Inicia sesión para usar esta función',
        position: 'bottom-end',
        showConfirmButton: true,
        confirmButtonText: 'Ir a Login',
        confirmButtonColor: '#2c87ff',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        timer: 5000,
        timerProgressBar: true

      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'])

        }
      });
    }



  }

  esFavorito(productoId: string): boolean {
    return this.favoritos.has(productoId);
  }


  PrecioA12Meses(precio: number): number {

    var precioConvertido = precio / 12;

    //Tofixed Redondeamos y convertimos a string ej (precio/12).tofixed(decimales numero ej : 2);
    return precioConvertido;
  }




  usuarioLogeado(): boolean {

    this.seguridadService.estaLogueado()


    return this.seguridadService.estaLogueado();
  }


  // agregarFavoritoLista(producto: any) {
  //   this.favoritoService.agregarItem({ productoId: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen }).subscribe({
  //     next: () => {

  //       //Marcamos el corazon
  //       this.favoritos.add(producto.id);

  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "bottom-end",
  //         showConfirmButton: false,
  //         timer: 2000,
  //         timerProgressBar: true,

  //       });


  //       Toast.fire({
  //         icon: "success",
  //         title: "Producto Agregado a la lista",

  //       });
  //     },
  //     error: (e) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: e.error,
  //       });
  //     }
  //   })
  // }


  agregarAlCarrito(producto: any) {




    this.carritoService.agregarItem({ productoId: producto.id, cantidad: 1, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagenUrl }).subscribe({
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
