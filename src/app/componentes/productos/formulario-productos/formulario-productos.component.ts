import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductoCreacionDTO, ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputImgComponent } from '../../../compartidos/input-img/input-img.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CategoriaDTO } from '../../../modelos/CategoriaModelos/Categoria';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { CategoriaService } from '../../../servicios/categoria.service';

@Component({
  selector: 'app-formulario-productos',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, InputImgComponent],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.css'
})
export class FormularioProductosComponent implements OnInit {




  ngOnInit(): void {


    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

    this.categoriaServicio.obtenerTodos().subscribe({
      next: (categorias) => (this.categoriasDTO = categorias),
      error: (err) => console.log('Error', err)
    });

  }


  @Input()
  modelo?: ProductoDTO;

  categoriasDTO: CategoriaDTO[] = []
  categoriaServicio = inject(CategoriaService);


  @Output()
  posteoFormulario = new EventEmitter<ProductoCreacionDTO>();


  private formBuilder = inject(FormBuilder);


  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required] }],
    descripcion: ['', { validators: [Validators.required, Validators.maxLength(200)] }],
    precio: [0, { validators: [Validators.required] }],
    imagenUrl: new FormControl<File | string | null>(null),
    categoriaId: ['', [Validators.required]],
    stock: [0, { validators: [Validators.required] }]

  })




  archivoSeleccionado(file: File) {
    this.form.controls.imagenUrl.setValue(file);
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const producto = this.form.value as ProductoCreacionDTO;

    console.log("Datos", producto);

    //Si editamos y la foto no se cambia la mandamos undefined ahorrando memoria en backend
    if (typeof producto.imagenUrl === "string") {
      producto.imagenUrl = undefined
    }

    this.posteoFormulario.emit(producto);
  }


}
