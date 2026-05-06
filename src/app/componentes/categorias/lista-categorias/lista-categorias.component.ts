import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../../servicios/categoria.service';
import { RouterLink } from '@angular/router';
import { MatButton } from "@angular/material/button";
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";

@Component({
  selector: 'app-lista-categorias',
  imports: [RouterLink, MatButton, ListadoGenericoComponent],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.css'
})
export class ListaCategoriasComponent {


@Input({required:true})
  categoriasLista:CategoriaDTO[] = []

  categoriaServicio = inject(CategoriaService);
  cargando = false;
  error: string | null = null;

  @Output()
  categoriaBorrada = new EventEmitter<string>();



  borrar(id: string) {
    this.categoriaBorrada.emit(id);
  }


}
