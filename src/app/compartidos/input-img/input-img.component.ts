import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../toBase64';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {



  
  @Input({ required: true })
  titulo!: string;

  @Input()
  urlImagenActual?:string;

  @Output()
  archivoSeleccionado = new EventEmitter<File>();


  //Imagen Convertida de Bites a Representacion en string
  imagenBase64?: string;

  cambio(event: Event) {

    const input = event.target as HTMLInputElement;


    //Si Fue seleccionado un archivo
    if (input.files && input.files.length > 0) {
      //Primer Archivo
      const file: File = input.files[0];

      //Exitoso ejecutamos el  then      
      toBase64(file).then((valor: string) => this.imagenBase64 = valor)
        .catch(error => console.log(error));
      this.archivoSeleccionado.emit(file);

      //Si seleccionamos nueva imagen borramos la anterior
      this.urlImagenActual = undefined
    }


  }

}
