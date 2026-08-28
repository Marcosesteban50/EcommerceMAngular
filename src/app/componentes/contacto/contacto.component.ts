import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../seguridad/seguridad.service';
import Swal from 'sweetalert2';
import { ContactoDTO } from '../../seguridad/seguridad';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule,],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {


  private formBuilder = inject(FormBuilder);
  seguridadService = inject(SeguridadService);

  form = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
  });

  enviarCorreo() {

    if (this.form.invalid) {
      return;
    }

    //Rawvalue tomamos valores del formulario y creamos objeto con ellos
    const contacto = this.form.getRawValue() as ContactoDTO;

    console.log('FORM:', this.form.getRawValue());
    console.log('CONTACTO:', contacto);
    console.log('CORREO:', contacto.correo);


    this.seguridadService.enviarCorreo(contacto).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Tu mensaje fue enviado correctamente'
        });

        this.form.reset();

      },

      error: err => {

        console.error('Error enviando correo:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo enviar el mensaje'
        });

      }

    });

  }

}
