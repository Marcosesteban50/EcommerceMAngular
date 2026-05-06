import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CategoriaCreacionDTO, CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { CategoriaService } from '../../../servicios/categoria.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-categorias',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-categorias.component.html',
  styleUrl: './formulario-categorias.component.css'
})
export class FormularioCategoriasComponent implements OnInit {


  ngOnInit(): void {


    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

  }




  @Input()
  modelo?: CategoriaDTO;

  categoriasDTO: CategoriaDTO[] = []
  categoriaServicio = inject(CategoriaService);



  @Output()
  posteoFormulario = new EventEmitter<CategoriaCreacionDTO>();


  private formBuilder = inject(FormBuilder);



  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required] }]
  });



  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const categoria = this.form.value as CategoriaCreacionDTO;

    this.posteoFormulario.emit(categoria);
  }

}
