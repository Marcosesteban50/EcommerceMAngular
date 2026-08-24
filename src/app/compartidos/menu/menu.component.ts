import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
import { MatSliderModule } from '@angular/material/slider';
import { FavoritoService } from '../../servicios/favorito.service';

@Component({
  selector: 'app-menu',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
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
  favoritoServicio = inject(FavoritoService);
  cantidadCarrito = 0;
  cantidadFavorito = 0;
  busquedaActiva = false;
  menuColapsado = true;
  dropdownOrdenesOpen = false;
  dropdownAdminOpen = false;


  categorias: CategoriaDTO[] = [];

  formBusqueda = this.formBuilder.group({
    nombre: [''],
    categoriaId: [''],
    precioMin: [0],
    precioMax: [0]
  });

  ngOnInit(): void {
    this.cargarCategorias();

    this.carritoServicio.cantidadCarrito$.subscribe(x => {
      this.cantidadCarrito = x;
    });

    this.favoritoServicio.cantidadFavoritos$.subscribe(x => {
      this.cantidadFavorito = x;
    });

    this.carritoServicio.actualizarCantidad();
  }

  obtenerFotoPerfil(): string {
    return this.seguridadService.obtenerFotoUsuario();
  }

  obtenerCarritoLocal() {
    var logeado = this.seguridadService.estaLogueado();
    const carrito = JSON.parse(localStorage.getItem('carritoInvitado') || '[]');

    if (logeado) {
      this.carritoServicio.obtenerCarrito().subscribe(x => {
        this.cantidadCarrito = x.items.length;
      });

      this.favoritoServicio.obtenerFavoritos().subscribe(x => {
        this.cantidadFavorito = x.items.length;
      });
    }

    this.cantidadCarrito = carrito.length;
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

    this.router.navigate(['/productos/filtrar'], {
      queryParams: {
        categoriaId: categoriaId || null,
        nombre: nombre || null
      }
    });

    this.busquedaActiva = false;
  }



  cerrarMenu(): void {
    if (window.innerWidth <= 1100) {
      this.menuColapsado = true;
    }
  }

  toggleMenu(): void {
    this.menuColapsado = !this.menuColapsado;
  }

  toggleBusqueda(): void {
    this.busquedaActiva = !this.busquedaActiva;
  }


  toggleDropdown(x: string) {
    if (x === 'ordenes') {
      this.dropdownOrdenesOpen = !this.dropdownOrdenesOpen;
      this.dropdownAdminOpen = false;
    }
    else if (x === 'admin') {
      this.dropdownAdminOpen = !this.dropdownAdminOpen;
      this.dropdownOrdenesOpen = false;
    }
  }


  obtenerNombreUsuario(): string {
    const email = this.seguridadService.obtenerCampoJWT('email');
    return email ? email.split('@')[0] : '';
  }
}