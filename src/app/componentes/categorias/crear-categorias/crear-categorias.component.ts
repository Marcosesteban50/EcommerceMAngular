import { Component, inject } from '@angular/core';
import { FormularioCategoriasComponent } from "../formulario-categorias/formulario-categorias.component";
import { Router } from '@angular/router';
import { CategoriaService } from '../../../servicios/categoria.service';
import { CategoriaCreacionDTO } from '../../../modelos/CategoriaModelos/Categoria';

@Component({
  selector: 'app-crear-categorias',
  imports: [FormularioCategoriasComponent],
  templateUrl: './crear-categorias.component.html',
  styleUrl: './crear-categorias.component.css'
})
export class CrearCategoriasComponent {

private router = inject(Router);
private categoriaServicio = inject(CategoriaService);
errores: string[] = [];




guardarCambios(categoria:CategoriaCreacionDTO){
  this.categoriaServicio.crear(categoria).subscribe({
    next: ()=>{
      this.router.navigate(['/categorias']);
    },
    error:(err) => {
      
      this.errores = err;
      console.log(err);
    }
  })
}

}
