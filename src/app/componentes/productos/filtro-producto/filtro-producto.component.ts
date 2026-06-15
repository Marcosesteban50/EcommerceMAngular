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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Aos from 'aos';
import { debounceTime } from 'rxjs';
import { MenuComponent } from "../../../compartidos/menu/menu.component";

@Component({
  selector: 'app-filtro-producto',
  imports: [MatSlideToggleModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListaProductosComponent],
  templateUrl: './filtro-producto.component.html',
  styleUrl: './filtro-producto.component.css'
})
export class FiltroProductoComponent implements OnInit {


  ngOnInit(): void {

    this.leerValoresURL();

    Aos.init({
      duration: 1000,
      once: true,
    })


    this.buscarProductos(this.form.value as FiltroProductos);


    this.form.valueChanges.pipe(debounceTime(300)).subscribe(x => {
      this.buscarProductos(x as FiltroProductos);

      this.escribirParametrosBusquedaEnURL(x as FiltroProductos);
    });

    this.buscarProductos(this.form.value as FiltroProductos);



  }


  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  @Output()
  productosFiltrados = new EventEmitter<ProductoDTO[]>();

  productos: ProductoDTO[] = []
  productoServicio = inject(ProductoService);

  error: string | null = null;





  //Metodo productos Buscar
  buscarProductos(valores: FiltroProductos) {




    this.productoServicio.filtrar(valores).subscribe(respuesta => {
      console.log("Resultado filtro:", this.productos);

      this.productos = respuesta.body as ProductoDTO[];

      // this.productosFiltrados.emit(this.productos);
    })

  }

  


  //Asi se crean variables
  get precioMin(): number {
    return this.form.controls.precioMin.value ?? 0;
  }

  get precioMax(): number {
    return this.form.controls.precioMax.value ?? 0;
  }

  escribirParametrosBusquedaEnURL(valores: FiltroProductos) {

    let queryStrings = [];

    if (valores.nombre) {
      queryStrings.push(`nombre=${encodeURIComponent(valores.nombre)}`);
    }

    if (valores.categoriaId) {
      queryStrings.push(`categoriaId=${encodeURIComponent(valores.categoriaId)}`);
    }

    if (valores.precioMin) {
      queryStrings.push(`precioMin=${valores.precioMin}`);
    }

    if (valores.precioMax) {
      queryStrings.push(`precioMax=${valores.precioMax}`);
    }

    this.location.replaceState(
      'productos/filtrar',
      queryStrings.join('&')
    );
  }


  leerValoresURL() {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {

      //reseteamos para cuando demos click an opcion todos se muestren todos
      this.form.reset({
        nombre: '',
        categoriaId: '',
        precioMin: 0,
        precioMax: 0
      });

      var objeto: any = {};

      const nombre = params.get('nombre');
      const categoriaId = params.get('categoriaId');
      const precioMin = params.get('precioMin');
      const precioMax = params.get('precioMax');

      if (nombre) {
        objeto.nombre = nombre;
      }

      if (categoriaId) {
        objeto.categoriaId = categoriaId;
      }
      if (precioMin) {
        objeto.precioMin = Number(precioMin);
      }

      if (precioMax) {
        objeto.precioMax = Number(precioMax);
      }


      this.form.patchValue(objeto);

      console.log('Formulario cargado:', this.form.value);


      this.buscarProductos(this.form.value as FiltroProductos);
    })
  }

  form = this.formBuilder.group({
    nombre: [''],
    categoriaId: [''],
    precioMin: [0],
    precioMax: [3000]
  });






}
