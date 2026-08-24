import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../servicios/producto.service';
import { CategoriaService } from '../../../servicios/categoria.service';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { CarritoService } from '../../../servicios/carrito.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-detalle-producto',
  imports: [FormsModule, CurrencyPipe, ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  ngOnInit(): void {




    // Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;


    this.cargarCategorias();


    // Cuando se inicializa obtenemos el producto por id
    this.productoService.obtenerPorId(this.id).subscribe(productoX => {
      this.producto = productoX;
    });



  }

  indiceImagen = 0;
  id!: string;
  categoriaId!: string;
  producto!: ProductoDTO;
  categorias: CategoriaDTO[] = [];
  cantidad: number = 1;

  private formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  productoService = inject(ProductoService);
  categoriaServicio = inject(CategoriaService);
  carritoService = inject(CarritoService)




  form = this.formBuilder.group({
  
    cantidad: [0, { validators: [Validators.required] }],


  })

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
          position: 'bottom-end',
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



  imagenSiguiente() {

    //Si no hay imagen pues salimos
    if (!this.producto.imagenes?.length) {
      return;
    }

    //pasamos a la siguiente imagen
    this.indiceImagen++;


    //reseteamos a la primera imagen cuando llegamos al final
    if (this.indiceImagen >= this.producto.imagenes.length) {
      this.indiceImagen = 0;
    }
  }


  imagenAnterior() {

    //Si no hay imagen pues salimos
    if (!this.producto.imagenes?.length) {
      return;
    }
    //pasamos a la  imagen anterior
    this.indiceImagen--;

    //si estas en la primera imagen , ve a la ultima
    if (this.indiceImagen < 0) {

      //volvemos a la ultima imagen si estamos en la primera
      this.indiceImagen = this.producto.imagenes.length - 1;
    }
  }

  cargarCategorias(): void {
    this.categoriaServicio.obtenerTodos().subscribe({
      next: (categorias) => {

        this.categorias = categorias;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }



  PrecioA12Meses(precio: number): number {

    var precioConvertido = precio / 12;

    //Tofixed Redondeamos y convertimos a string ej (precio/12).tofixed(decimales numero ej : 2);
    return precioConvertido;
  }



  obtenerNombreCategoria(catId?: string): string {

    var categoria = this.categorias.find(x => x.id === catId)?.nombre ?? 'Categoria';


    return categoria;
  }


}
