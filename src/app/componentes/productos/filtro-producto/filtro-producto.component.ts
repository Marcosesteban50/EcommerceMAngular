import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { ProductoService } from '../../../servicios/producto.service';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../../servicios/categoria.service';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { FiltroProductos } from '../../../modelos/ProductoModelos/FiltroProductos';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Aos from 'aos';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filtro-producto',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListaProductosComponent],
  templateUrl: './filtro-producto.component.html',
  styleUrl: './filtro-producto.component.css'
})
export class FiltroProductoComponent implements OnInit {


  ngOnInit(): void {



    Aos.init({
      duration: 1000,
      once: true,
    })


    //Categorias
    this.categoriaServicio.obtenerTodos().subscribe(categorias => {
      this.categorias = categorias;

      this.leerValoresURL();
      this.buscarProductos(this.form.value as FiltroProductos);

      //Productos
      this.productoServicio.obtenerTodos().subscribe(x => {
        this.form.valueChanges.pipe(
          debounceTime(300)
        )

          .subscribe(v => {
            this.buscarProductos(v as FiltroProductos);
            this.escribirParametrosBusquedaEnURL(v as FiltroProductos)
            console.log(v)
          })
      })

      //Si El valor es null o '',ponemos 0 por default en precioMin
      this.form.controls.precioMin.valueChanges.subscribe(x => {
        if (x === null) {
          this.form.controls.precioMin.setValue(0, { emitEvent: false })
        }
      });

      //Si El valor es null o '',ponemos 0 por default en precioMax
      this.form.controls.precioMax.valueChanges.subscribe(x => {
        if (x === null) {
          this.form.controls.precioMax.setValue(0, { emitEvent: false })
        }
      });



    });

  }


  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  @Output()
  productosFiltrados = new EventEmitter<ProductoDTO[]>();

  productos: ProductoDTO[] = []
  productoServicio = inject(ProductoService);
  categorias: CategoriaDTO[] = []
  categoriaServicio = inject(CategoriaService);
  error: string | null = null;





  //Metodo productos Buscar
  buscarProductos(valores: FiltroProductos) {




    this.productoServicio.filtrar(valores).subscribe(respuesta => {
      console.log("Resultado filtro:", this.productos);

      this.productos = respuesta.body as ProductoDTO[];

      // this.productosFiltrados.emit(this.productos);
    })

  }


  escribirParametrosBusquedaEnURL(valores: FiltroProductos) {
    let queryStrings = [];

    if (valores.nombre) {
      queryStrings.push(`nombre=${encodeURIComponent(valores.nombre)}`);
    }

    if (valores.categoriaId) {
      queryStrings.push(`categoriaId=${encodeURIComponent(valores.categoriaId)}`);
    }


    if (valores.precioMin > 0) {
      queryStrings.push(`PrecioMin=${valores.precioMin}`);
    }

    if (valores.precioMax > 0) {
      queryStrings.push(`PrecioMax=${valores.precioMax}`);
    }



    this.location.replaceState('productos/filtrar', queryStrings.join('&'))
  }



  leerValoresURL() {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {

      var objeto: any = {};

      if (params.nombre) {
        objeto.nombre = params.nombre;
      }

      if (params.categoriaId) {
        objeto.categoriaId = params.categoriaId
      }
      if (params.precioMin) {
        objeto.precioMin = Number(params.precioMin);
      }

      if (params.precioMax) {
        objeto.precioMax = Number(params.precioMax);
      }


      this.form.patchValue(objeto);
    })
  }

  form = this.formBuilder.group({
    nombre: [''],
    categoriaId: [''],
    precioMin: [0],
    precioMax: [0]
  });






}
