import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EstadoOrdenDTO, EstadoPagoDTO, OrdenCreacionDTO, OrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';
import { OrdenService } from '../../../servicios/orden.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-formulario-ordenes',
  imports: [MatButtonModule, CurrencyPipe, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, RouterLink],
  templateUrl: './formulario-ordenes.component.html',
  styleUrl: './formulario-ordenes.component.css'
})
export class FormularioOrdenesComponent implements OnInit {


  ngOnInit(): void {

    //Lo hacemos asi para coincidir con el backend y asi traer el orden y pago como en categorias de productos
    if (this.modelo) {
      this.form.patchValue({

        //estos 2 especificos
        estadoOrdenId: this.modelo.estadoOrden?.id,
        estadoPagoId: this.modelo.estadoPago?.id
      });
    }



    this.ordenServicio.obtenerEstadosOrden().subscribe({
      next: (estadosOrden) => (this.estadoOrdenDTO = estadosOrden),
      error: (err) => console.log('Error', err)
    });



    this.ordenServicio.obtenerEstadosPagos().subscribe({
      next: (estadopagos) => (this.estadoPagoDTO = estadopagos),
      error: (err) => console.log('Error', err)
    });

  }




  @Input()
  modelo?: OrdenDTO;
  ordenServicio = inject(OrdenService);

  estadoOrdenDTO: EstadoOrdenDTO[] = []
  estadoPagoDTO: EstadoPagoDTO[] = []




  @Output()
  posteoFormulario = new EventEmitter<OrdenCreacionDTO>();


  private formBuilder = inject(FormBuilder);



  form = this.formBuilder.group({
    estadoOrdenId: ['', Validators.required],
    estadoPagoId: ['', Validators.required],
  });




  guardarCambios() {
    if (!this.form.valid) {
      return;
    }


    const orden = this.form.value as OrdenCreacionDTO;

    console.log("Datos", orden);

    this.posteoFormulario.emit(orden);
  }

}
