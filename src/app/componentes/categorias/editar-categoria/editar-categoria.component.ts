import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { CategoriaCreacionDTO, CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../../servicios/categoria.service';
import { FormularioCategoriasComponent } from "../formulario-categorias/formulario-categorias.component";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-categoria',
  imports: [FormularioCategoriasComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {

  ngOnInit(): void {


    //Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    //Cuando se inicializa obtenemos el id de la categoria
    this.categoriaService.obtenerPorId(this.id).subscribe(categoriaX => {
      this.categoria = categoriaX;
    })
  }

  @Input()
  id!: string;

  router = inject(Router);
  categoria?: CategoriaDTO;
  categoriaService = inject(CategoriaService);
  route = inject(ActivatedRoute);


  guardarCambios(categoria: CategoriaCreacionDTO) {
    //Cuando enviamos la peticion ahi es donde actualizamos:D
    this.categoriaService.actualizar(this.id, categoria).subscribe({
      next: () => {
        console.log('editando categoria', categoria);
        this.router.navigate(['/categorias'])
      },
      error: err => {
        console.log('Error al editar categoria', err);
      }
    })
  }

}
