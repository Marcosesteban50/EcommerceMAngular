import { Component, inject, OnInit } from '@angular/core';
import { ProductoHistorial } from '../../../modelos/ProductoModelos/Producto';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../servicios/producto.service';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../../servicios/categoria.service';

@Component({
  selector: 'app-detalle-historial-productos',
  imports: [DatePipe],
  templateUrl: './detalle-historial-productos.component.html',
  styleUrl: './detalle-historial-productos.component.css'
})
export class DetalleHistorialProductosComponent implements OnInit {

  historial!: ProductoHistorial;
  id!: string;
  categorias!: CategoriaDTO;

  route = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  categoriasService = inject(CategoriaService);

  ngOnInit(): void {

    // 🔹 tomar el id de la URL 
    this.id = this.route.snapshot.paramMap.get('id')!;

    // 🔹 llamar al endpoint del historial



    // Cuando se inicializa obtenemos el producto por id
    this.productoService.obtenerHistorialDeProducto(this.id).subscribe(historialX => {
      this.historial = historialX;

      if (this.historial.categoriaId) {
        this.categoriasService.obtenerPorId(this.historial.categoriaId)
          .subscribe(cat => this.categorias = cat)
      }
    });

  }
}