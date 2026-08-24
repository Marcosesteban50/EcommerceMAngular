import { Component, inject, OnInit } from '@angular/core';
import { PerfilUsuario } from '../../modelos/PerfilModelos/PerfilUsuario';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { PerfilService } from '../../servicios/perfil.service';
import { Router } from '@angular/router';
import { FavoritoService } from '../../servicios/favorito.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-favorito',
  imports: [CurrencyPipe],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent implements OnInit {

  lista: any[] = [];
  total: number = 0;
  perfilUsuario!: PerfilUsuario;




  favoritoServicio = inject(FavoritoService)
  carritoServicio = inject(CarritoService)
  seguridadServicio = inject(SeguridadService);
  perfilServicio = inject(PerfilService);
  router = inject(Router);

  ngOnInit() {
    this.cargarLista();
    this.cargarPerfil();
  }

  cargarLista() {
    this.favoritoServicio.obtenerFavoritos().subscribe({
      next: (data) => {
        this.lista = data.items ?? [];
      },
      error: err => {
        console.error('Error cargando', err);
      }
    });
  }



  cargarPerfil() {
    this.perfilServicio.obtenerMiPerfil().subscribe({
      next: (x) => {
        this.perfilUsuario = x;
      },
      error: err => {
        console.error('Error cargando perfil', err);
      }
    })
  }


eliminarEnFavoritos(id:string){
    this.favoritoServicio.eliminarItem(id).subscribe(() => {
      this.cargarLista();
    });
}

  eliminar(id: string) {
    this.favoritoServicio.eliminarItem(id).subscribe(() => {
      Swal.fire('Eliminado', 'Producto eliminado de la lista', 'info');
      this.cargarLista();
    });
  }

  limpiar() {
    this.favoritoServicio.vaciarLista().subscribe(() => {
      Swal.fire('Carrito vacío', '', 'info');
      this.cargarLista();
    });
  }


  obtenerNombreUsuario(): string {
    const email = this.seguridadServicio.obtenerCampoJWT('email');
    return email ? email.split('@')[0] : '';
  }

  agregarAlCarrito(producto: any) {

    // console.log('Producto completo:', producto);
    // console.log('producto.id:', producto.id);

    const item = {
      productoId: producto.productoId,
      cantidad: 1,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenUrl
    };

    console.log('Objeto enviado al API:', item);

    this.carritoServicio.agregarItem(item).subscribe({
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


        this.eliminarEnFavoritos(item.productoId);
      },
      error: (e) => {

        console.log('Error completo:', e);
        console.log('Error body:', e.error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: JSON.stringify(e.error)
        });
      }
    });
  }


}
