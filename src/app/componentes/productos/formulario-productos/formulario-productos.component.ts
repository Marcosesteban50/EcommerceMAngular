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
      const { imagenes, ...datosFormulario } = this.modelo;

      this.form.patchValue(datosFormulario);
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


  imagenesEliminadas: string[] = [];
  private formBuilder = inject(FormBuilder);


  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required] }],
    descripcion: ['', { validators: [Validators.required, Validators.maxLength(200)] }],
    precio: [0, { validators: [Validators.required] }],
    imagenes: new FormControl<File[]>([]),
    categoriaId: ['', [Validators.required]],
    stock: [0, { validators: [Validators.required] }]

  })




  archivoSeleccionado(files: File[]) {
    this.form.controls.imagenes.setValue(files);
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const producto = this.form.value as ProductoCreacionDTO;

    producto.imagenesEliminadas = this.imagenesEliminadas;

    console.log("Datos", producto);

    this.posteoFormulario.emit(producto);
  }


  imagenActualEliminada(url: string) {

    this.imagenesEliminadas.push(url);

    console.log(
      'Imágenes existentes a eliminar:',
      this.imagenesEliminadas
    );
  }


}
