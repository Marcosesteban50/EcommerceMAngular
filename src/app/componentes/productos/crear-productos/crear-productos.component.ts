import { Component, inject } from '@angular/core';
import { FormularioProductosComponent } from '../formulario-productos/formulario-productos.component';
import { Router } from '@angular/router';
import { ProductoService } from '../../../servicios/producto.service';
import { ProductoCreacionDTO } from '../../../modelos/ProductoModelos/Producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  imports: [FormularioProductosComponent],
  templateUrl: './crear-productos.component.html',
  styleUrl: './crear-productos.component.css'
})
export class CrearProductosComponent {


  private router = inject(Router);
  private ProductoServicio = inject(ProductoService);
  errores: string[] = [];


  guardarCambios(producto: ProductoCreacionDTO) {
    this.ProductoServicio.crear(producto).subscribe({
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
          title: "Producto enviado para aprobacion"
        });


        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.errores = err;
        console.log(err);



        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al enviar el producto.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });

      }
    })
  }

}
