import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { debounceTime } from 'rxjs';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { FiltroProductosNombre } from '../../../modelos/ProductoModelos/FiltroProductos';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { CategoriaService } from '../../../servicios/categoria.service';
import { ProductoService } from '../../../servicios/producto.service';
import { Location } from '@angular/common';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggle } from "@angular/material/slide-toggle";


@Component({
  selector: 'app-filtro-producto-landing',
  imports: [MatFormFieldModule, ReactiveFormsModule, ListaProductosComponent, MatInputModule, MatSelectModule, MatIconModule],
  templateUrl: './filtro-producto-landing.component.html',
  styleUrl: './filtro-producto-landing.component.css'
})
export class FiltroProductoLandingComponent implements OnInit {

  ngOnInit(): void {



    Aos.init({
      duration: 1000,
      once: true,
    })


    //Categorias

    this.categoriaServicio.obtenerTodos().subscribe(categorias => {
      this.categorias = categorias;

      this.leerValoresURL();

      this.buscarProductos(this.form.value as FiltroProductosNombre);

      //Productos
      this.productoServicio.obtenerTodos().subscribe(x => {
        this.form.valueChanges.pipe(
          debounceTime(300)
        )

          .subscribe(v => {
            console.log('CAMBIÓ', v);
            this.buscarProductos(v as FiltroProductosNombre);
            this.escribirParametrosBusquedaEnURL(v as FiltroProductosNombre)
            console.log(v)
          })
      })

    });

  }





  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  @Output()
  productosFiltrados = new EventEmitter<ProductoDTO[]>();

  productos: ProductoDTO[] = []
  productoServicio = inject(ProductoService);
  categorias: CategoriaDTO[] = []
  categoriaServicio = inject(CategoriaService);
  error: string | null = null;
  ordenDescendente = false;



  form = this.formBuilder.group({
    nombre: [''],
    categoriaId: [''],
    precioMin: [0],
    precioMax: [3000],

  });


  //Asi se crean variables
  get precioMin(): number {
    return this.form.controls.precioMin.value ?? 0;
  }

  get precioMax(): number {
    return this.form.controls.precioMax.value ?? 0;
  }

  onPrecioChange() {

    const precioMin = this.form.controls.precioMin.value;
    const precioMax = this.form.controls.precioMax.value;

    this.router.navigate(['/productos/filtrar'], {
      queryParams: {
        precioMin: precioMin || null,
        precioMax: precioMax || null
      }
    });

  }





  //Metodo productos Buscar
  buscarProductos(valores: FiltroProductosNombre) {




    this.productoServicio.filtrarLanding(valores).subscribe(respuesta => {
      console.log("Resultado filtro:", this.productos);

      this.productos = respuesta.body as ProductoDTO[];

      this.productosFiltrados.emit(this.productos);
    })

  }



  escribirParametrosBusquedaEnURL(valores: FiltroProductosNombre) {
    let queryStrings = [];

    if (valores.nombre) {
      queryStrings.push(`nombre=${encodeURIComponent(valores.nombre)}`);
    }
    if (valores.categoriaId) {
      queryStrings.push(`categoriaId=${encodeURIComponent(valores.categoriaId)}`);
    }

    if (valores.precioMin) {
      queryStrings.push(`precioMin=${encodeURIComponent(valores.precioMin)}`);
    }
    if (valores.precioMax) {
      queryStrings.push(`precioMax=${encodeURIComponent(valores.precioMax)}`);
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
        objeto.precioMin = params.precioMin;
      }

      if (params.precioMax) {
        objeto.precioMax = params.precioMax;
      }



      this.form.patchValue(objeto);
    })
  }






}
