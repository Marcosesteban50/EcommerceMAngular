import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductoCreacionDTO, ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { ProductoService } from '../../../servicios/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormularioProductosComponent } from "../formulario-productos/formulario-productos.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductosComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

  ngOnInit(): void {


    //Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    //Cuando se inicializa obtenemos el id de la categoria
    this.productoService.obtenerPorId(this.id).subscribe(productoX => {
      this.producto = productoX;
    })
  }

  @Input()
  id!: string;

  router = inject(Router);
  producto?: ProductoDTO;
  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);


  guardarCambios(producto: ProductoCreacionDTO) {
    //Cuando enviamos la peticion ahi es donde actualizamos:D
    this.productoService.actualizar(this.id, producto).subscribe({
      next: () => {

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Producto editado"
        });

        console.log('editando producto', producto);
        this.router.navigate(['/productos'])
      },
      error: err => {
        console.log('Error al editar producto', err);


        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al editar el producto.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    })
  }
}
