import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PerfilUsuario } from '../../../modelos/PerfilModelos/PerfilUsuario';

@Component({
  selector: 'app-formulario-perfil',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './formulario-perfil.component.html',
  styleUrl: './formulario-perfil.component.css'
})
export class FormularioPerfilComponent implements OnInit {



  ngOnInit(): void {

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

  }


  @Input()
  modelo?: PerfilUsuario;



  @Output()
  posteoFormulario = new EventEmitter<PerfilUsuario>();

  private formBuilder = inject(FormBuilder);


  form = this.formBuilder.group({
    nombreCompleto: ['', { validators: [Validators.required] }],
    telefono: ['', { validators: [Validators.required] }],
    direccionEnvio: ['', { validators: [Validators.required] }],

  });



  guardarCambios() {
    if (!this.form.valid) {
      return;
    }

    
        const perfil = this.form.value as PerfilUsuario;
    
        console.log("Datos", perfil);
    
    
    
        this.posteoFormulario.emit(perfil);

  }



}
