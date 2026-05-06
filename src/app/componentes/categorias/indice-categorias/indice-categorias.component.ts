import { Component, inject, OnInit } from '@angular/core';
import { ListaCategoriasComponent } from "../lista-categorias/lista-categorias.component";
import { RouterLink } from '@angular/router';
import Aos from 'aos';
import { MatButton } from "@angular/material/button";
import { CategoriaService } from '../../../servicios/categoria.service';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-indice-categorias',
  imports: [ListaCategoriasComponent, RouterLink, MatButton],
  templateUrl: './indice-categorias.component.html',
  styleUrl: './indice-categorias.component.css'
})
export class IndiceCategoriasComponent implements OnInit {




  categoriaServicio = inject(CategoriaService);
  categorias!: CategoriaDTO[];

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      once: true,
    })

    this.cargarCategorias();
  }



  cargarCategorias() {

    this.categoriaServicio.obtenerTodos().subscribe(categoriasX => {
      this.categorias = categoriasX;
    })
  }


  borrarCategoria(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto será borrado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then(result => {

      if (result.isConfirmed) {

        this.categoriaServicio.borrar(id).subscribe(() => {

          // 🔥 Remover producto de la lista sin recargar
          this.categorias = this.categorias.filter(x => x.id !== id);

          Swal.fire(
            "Borrado",
            "La categoria se eliminó correctamente.",
            "success"
          );

        });

      }
    });
  }




}
