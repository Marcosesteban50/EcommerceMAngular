import { Component, inject, OnInit } from '@angular/core';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { ProductoService } from '../../../servicios/producto.service';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import Aos from 'aos';
import { RouterLink } from '@angular/router';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-indice-productos',
  imports: [ListaProductosComponent, RouterLink, AutorizadoComponent,MatButtonModule],
  templateUrl: './indice-productos.component.html',
  styleUrl: './indice-productos.component.css'
})
export class IndiceProductosComponent implements OnInit {

  productoServicio = inject(ProductoService);
  productos!: ProductoDTO[];



  ngOnInit(): void {

    Aos.init({
      duration: 1000,
      once: true,
    });

    this.cargarProductos();


  }


  cargarProductos() {

    this.productoServicio.obtenerTodos().subscribe(productosX => {
      this.productos = productosX;
    })
  }


  borrarProducto(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto será borrado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then(result => {

      if (result.isConfirmed) {

        this.productoServicio.borrar(id).subscribe(() => {

          // 🔥 Remover producto de la lista sin recargar
          this.productos = this.productos.filter(x => x.id !== id);

          Swal.fire(
            "Borrado",
            "El producto se eliminó correctamente.",
            "success"
          );

        });

      }
    });
  }



}
