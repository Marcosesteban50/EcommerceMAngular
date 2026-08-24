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
  urlImagenesActuales?: string[];

  @Output()
  archivoSeleccionado = new EventEmitter<File[]>();


  //Imagen Convertida de Bites a Representacion en string
  imagenesBase64: string[] = [];



  async cambio(event: Event) {

    const input = event.target as HTMLInputElement;


    //Si Fue seleccionado un archivo
    if (!input.files?.length) {
      return;
    }

    const archivos = Array.from(input.files);

    this.imagenesBase64 = [];
    for (const archivo of archivos) {
      try {
        const base64 = await toBase64(archivo);

        this.imagenesBase64.push(base64);
      }
      catch (error) {
        console.error(error);
      }
    }


    console.log('Archivos Seleccionados',archivos);


    this.archivoSeleccionado.emit(archivos);
  }

}
