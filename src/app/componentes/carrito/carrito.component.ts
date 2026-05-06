import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';

import Swal from 'sweetalert2';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { CurrencyPipe } from '@angular/common';
import { OrdenService } from '../../servicios/orden.service';
import { Router } from '@angular/router';
import { PerfilUsuario } from '../../modelos/PerfilModelos/PerfilUsuario';
import { PerfilService } from '../../servicios/perfil.service';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;
  perfilUsuario!: PerfilUsuario;

  carritoServicio = inject(CarritoService);
  ordenesServicio = inject(OrdenService);
  seguridadServicio = inject(SeguridadService);
  perfilServicio = inject(PerfilService);
  router = inject(Router);

  ngOnInit() {
    this.cargarCarrito();
    this.cargarPerfil();
  }

  cargarCarrito() {
    this.carritoServicio.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data.items ?? [];
        this.total = data.total ?? 0;
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

  eliminar(id: string) {
    this.carritoServicio.eliminarItem(id).subscribe(() => {
      Swal.fire('Eliminado', 'Producto eliminado del carrito', 'info');
      this.cargarCarrito();
    });
  }

  limpiar() {
    this.carritoServicio.vaciarCarrito().subscribe(() => {
      Swal.fire('Carrito vacío', '', 'info');
      this.cargarCarrito();
    });
  }

  restar(id: string) {
    this.carritoServicio.eliminarUnaUnidad(id).subscribe(() => {
      this.cargarCarrito();
    });
  }

  sumar(id: string) {
    this.carritoServicio.agregarItem({
      productoId: id,
      cantidad: 1
    }).subscribe(() => {
      this.cargarCarrito();
    });
  }

  obtenerNombreUsuario(): string {
    const email = this.seguridadServicio.obtenerCampoJWT('email');
    return email ? email.split('@')[0] : '';
  }

  //  NUEVO CHECKOUT (CREA ORDEN)
  checkout() {

    // Aquí cambiamos: si no está logeado, no puede comprar todavía
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para finalizar la compra',
        confirmButtonText: 'Ir al login'
      }).then(() => {
        this.router.navigate(['/login']);
      });

      return;
    }


    const direccion = this.perfilUsuario?.direccionEnvio;
    console.log('Perfil:', this.perfilUsuario);
    console.log('Dirección:', this.perfilUsuario?.direccionEnvio);


    //  No tiene dirección -> redirigir al perfil
    if (direccion) {



      //  Tiene dirección -> confirmar compra
      Swal.fire({
        title: 'Confirmar compra',
        html: `<strong>Dirección de envío:</strong><br>${direccion}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
      }).then(result => {

        if (!result.isConfirmed) return;

        this.ordenesServicio.confirmarCompra(direccion).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Compra realizada correctamente', 'success');
            this.cargarCarrito();
          },
          error: err => {
            console.error(err);
            Swal.fire(
              'Error',
              err.error?.mensaje || 'Error al procesar la compra',
              'error'
            );

          }
        });

      });

      return;


    } else {

      Swal.fire({
        icon: 'warning',
        title: 'Dirección requerida',
        text: 'Debes completar tu dirección de envío antes de continuar',
        confirmButtonText: 'Ir a mi perfil'
      }).then(() => {
        this.router.navigate(['/perfil']);
      });
    }


  }

}
