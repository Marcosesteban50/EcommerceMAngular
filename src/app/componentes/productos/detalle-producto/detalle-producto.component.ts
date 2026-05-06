import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../servicios/producto.service';
import { CategoriaService } from '../../../servicios/categoria.service';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { CarritoService } from '../../../servicios/carrito.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  imports: [ FormsModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{
  ngOnInit(): void {



    // Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;





    // Cuando se inicializa obtenemos el producto por id
    this.productoService.obtenerPorId(this.id).subscribe(productoX => {
      this.producto = productoX;
    });



  }

  id!: string;
  categoriaId!: string;
  producto!: ProductoDTO;
  categorias!: CategoriaDTO;
  cantidad: number = 1;

  route = inject(ActivatedRoute);

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  carritoService = inject(CarritoService)

  agregarAlCarrito(id: string) {
    this.carritoService.agregarItem({
      productoId: id,
      cantidad: this.cantidad
    }).subscribe({
      next: () => {


        
        Swal.fire({
          icon: 'success',
          title: `Agregado (${this.cantidad}) al carrito`,
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
        });
      }
    });
  }



}
