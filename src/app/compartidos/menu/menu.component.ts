import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../../seguridad/seguridad.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IaComponent } from "../ia/ia.component";
import { CategoriaDTO } from '../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../servicios/categoria.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-menu',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    AutorizadoComponent,
    IaComponent,
    MatSliderModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  seguridadService = inject(SeguridadService);
  categoriaServicio = inject(CategoriaService);
  carritoServicio = inject(CarritoService);
  cantidadCarrito = 0;
  busquedaActiva = false;
  menuColapsado = false;

  categorias: CategoriaDTO[] = [];

  formBusqueda = this.formBuilder.group({
    nombre: [''],
    categoriaId: [''],
    precioMin:[0],
    precioMax:[0]
  });

  ngOnInit(): void {
    this.cargarCategorias();

    this.obtenerCarritoLocal();





  }

  obtenerFotoPerfil(): string {
    return this.seguridadService.obtenerFotoUsuario();
  }


  obtenerCarritoLocal() {
    //metodo si esta logeado el user
    var logeado = this.seguridadService.estaLogueado();

    //obteniendo Carrito local del local storage
    const carrito = JSON.parse(localStorage.getItem('carritoInvitado') || '[]');


    //Si esta logeado obtenemos el carrito del usuario
    if (logeado) {
      this.carritoServicio.obtenerCarrito().subscribe(x => {
        //obtenemos cantidad de items del carrito
        this.cantidadCarrito = x.items.length;
      })
    }


    //Si no obtenemos cantidad de items del carrito local
    this.cantidadCarrito = carrito.length;

    console.log("cantidad de carrito", this.cantidadCarrito);
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

  onCategoriaChange() {


    const categoriaId = this.formBusqueda.controls.categoriaId.value;
    const nombre = this.formBusqueda.controls.nombre.value;

    if (!categoriaId && !nombre) {


      this.router.navigate(['/productos/filtrar']);

    }


    //navegamos al filtro con los valores de busqueda mandandolos en queryParams
    this.router.navigate(['/productos/filtrar'], {
      queryParams: {

        categoriaId: categoriaId || null,
        nombre:nombre || null
      }
    });



    this.busquedaActiva = false;
  }


  //Esto es para el responsive
  cerrarMenu(): void {
    if (window.innerWidth <= 768) {
      this.menuColapsado = true;
    }
  }

  toggleMenu(): void {
    this.menuColapsado = !this.menuColapsado;
  }

  toggleBusqueda(): void {
    this.busquedaActiva = !this.busquedaActiva;
  }
}