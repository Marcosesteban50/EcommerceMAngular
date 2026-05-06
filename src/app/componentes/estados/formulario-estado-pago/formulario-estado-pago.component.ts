import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EstadoPagoCreacionDTO, EstadoPagoDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-estado-pago',
  imports: [MatButtonModule,RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-estado-pago.component.html',
  styleUrl: './formulario-estado-pago.component.css'
})
export class FormularioEstadoPagoComponent implements OnInit{


  ngOnInit(): void {


    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

  }




  @Input()
  modelo?: EstadoPagoDTO;

  estadoPagoDTO: EstadoPagoDTO[] = []
  EstadoServicio = inject(OrdenService);



  @Output()
  posteoFormulario = new EventEmitter<EstadoPagoCreacionDTO>();


  private formBuilder = inject(FormBuilder);



  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required] }]
  });



  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const estadopago = this.form.value as EstadoPagoCreacionDTO;

    this.posteoFormulario.emit(estadopago);
  }


}
