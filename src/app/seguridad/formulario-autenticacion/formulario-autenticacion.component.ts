import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredencialesUsuarioDTO } from '../seguridad';
import {  RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-autenticacion',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './formulario-autenticacion.component.html',
  styleUrl: './formulario-autenticacion.component.css'
})
export class FormularioAutenticacionComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }]

  })


  


  @Input()
  errores: string[] = [];


  @Output()
  posteoFormulario = new EventEmitter<CredencialesUsuarioDTO>();


  obtenerMensajeErrorEmail(): string {
    let campo = this.form.controls.email;

    if (campo.hasError('required')) {
      return 'El campo email es requrido'
    }

    if (campo.hasError('email')) {
      return 'El email no es valido'
    }
    return ''
  }


  obtenerMensajeErrorPassword(): string {
    let campo = this.form.controls.password;

    if (campo.hasError('required')) {
      return 'El campo password es requrido'
    }
    return ''
  }


  guardarCambios() {
    if (!this.form.valid) {
      return;
    }

    const credenciales = this.form.value as CredencialesUsuarioDTO;
    this.posteoFormulario.emit(credenciales);

  }

}
