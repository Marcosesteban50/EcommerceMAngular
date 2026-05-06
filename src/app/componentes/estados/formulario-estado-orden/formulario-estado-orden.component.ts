import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EstadoOrdenCreacionDTO, EstadoOrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-formulario-estado-orden',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-estado-orden.component.html',
  styleUrl: './formulario-estado-orden.component.css'
})
export class FormularioEstadoOrdenComponent implements OnInit{

  ngOnInit(): void {


    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

  }




  @Input()
  modelo?: EstadoOrdenDTO;

  estadoOrdenDTO: EstadoOrdenDTO[] = []
  EstadoServicio = inject(OrdenService);



  @Output()
  posteoFormulario = new EventEmitter<EstadoOrdenCreacionDTO>();


  private formBuilder = inject(FormBuilder);



  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required] }]
  });



  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const estadoOrden = this.form.value as EstadoOrdenCreacionDTO;

    this.posteoFormulario.emit(estadoOrden);
  }


}
