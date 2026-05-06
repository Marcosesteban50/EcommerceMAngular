import { Component, inject, OnInit } from '@angular/core';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { ProductoService } from '../../../servicios/producto.service';
import Aos from 'aos';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { ListaProductosPendientesComponent } from "../lista-productos-pendientes/lista-productos-pendientes.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-productos-pendientes',
  imports: [ListaProductosPendientesComponent],
  templateUrl: './indice-productos-pendientes.component.html',
  styleUrl: './indice-productos-pendientes.component.css'
})
export class IndiceProductosPendientesComponent implements OnInit {


  productoServicio = inject(ProductoService);
  productos!: ProductoDTO[];



  ngOnInit(): void {

    Aos.init({
      duration: 1000,
      once: true,
    })

    this.cargarPendientes();

  }


  cargarPendientes() {
    this.productoServicio.obtenerPendientes().subscribe(productos => {
      this.productos = productos;

      }
    )
  }



  aprobarProducto(id: string) {

    Swal.fire({
      title: "¿Aprobar producto?",
      text: "Este producto pasará a la lista de aprobados.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, aprobar",
      cancelButtonText: "Cancelar"
    }).then(res => {

      if (res.isConfirmed) {

        this.productoServicio.aprobarProducto(id).subscribe(() => {

          this.productos = this.productos.filter(x => x.id !== id);

          Swal.fire({
            icon: "success",
            title: "Aprobado",
            text: "El producto fue aprobado correctamente.",
            timer: 1800,
            showConfirmButton: false
          });

        });

      }

    });


  }


  rechazarProducto(id: string) {

    Swal.fire({
      title: "¿Rechazar producto?",
      text: "El producto será eliminado de la lista de pendientes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar"
    }).then(res => {

      if (res.isConfirmed) {

        this.productoServicio.rechazarProducto(id).subscribe(() => {

          this.productos = this.productos.filter(x => x.id !== id);

          Swal.fire({
            icon: "success",
            title: "Rechazado",
            text: "El producto fue rechazado correctamente.",
            timer: 1800,
            showConfirmButton: false
          });

        });

      }

    });
  }





}
