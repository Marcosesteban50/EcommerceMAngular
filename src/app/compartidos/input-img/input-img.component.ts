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


  //Imagen que enviamos en archivo hacia el backend
  archivosSeleccionados: File[] = [];


  //Imagen Convertida de Bites a Representacion en string para enviar al frontend
  imagenesBase64: string[] = [];



  async cambio(event: Event) {

    const input = event.target as HTMLInputElement;


    //Si Fue seleccionado un archivo
    if (!input.files?.length) {
      return;
    }

    const nuevosArchivos = Array.from(input.files);


    //con ... enviamos los elementos del array , no el array en si
    this.archivosSeleccionados.push(...nuevosArchivos);




    for (const x of nuevosArchivos) {
      try {
        const base64 = await toBase64(x);

        this.imagenesBase64.push(base64);
      }
      catch (error) {
        console.error(error);
      }
    }


    console.log('Archivos Seleccionados', this.archivosSeleccionados);

    // Mandamos TODAS al componente padre
    this.archivoSeleccionado.emit(this.archivosSeleccionados);

    // Permite seleccionar nuevamente incluso el mismo archivo
    input.value = '';
  }



  eliminarTodasImagenes() {


    this.archivosSeleccionados = [];
    this.imagenesBase64 = [];

    //enviamos lista actualizada
    this.archivoSeleccionado.emit(
      this.archivosSeleccionados
    );
  }


  eliminarImagen(index: number) {


    //Eliminamos la foto seleccionada que enviamos al backend ej:perro.jpg
    this.archivosSeleccionados.splice(index, 1);


    //Eliminamos la foto seleccionada para mostrar en la pagina 
    this.imagenesBase64.splice(index, 1);

    //enviamos lista actualizada
    this.archivoSeleccionado.emit(
      this.archivosSeleccionados
    );
  }

}
