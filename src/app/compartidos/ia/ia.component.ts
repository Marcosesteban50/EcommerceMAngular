import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../servicios/ia.service';

@Component({
  selector: 'app-ia',
  imports: [FormsModule],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css'
})
export class IaComponent {



  chatAbierto = false;
  Pregunta = '';
  cargando = false;

  mensajes: any[] = [];

  private iaService = inject(IaService);

  toggleChat() {
    //Cambiamos a el valor diferente que tenga actual , si = true ,sera = false y asi
    this.chatAbierto = !this.chatAbierto;
  }

  enviarConsulta() {

    //Evitamos mensajes vacios "   "
    if (!this.Pregunta.trim()) return;

    const preguntaUsuario = this.Pregunta;

    this.mensajes.push({
      texto: preguntaUsuario,
      //Tipo para el frontend se vea mas decorativo
      tipo: 'user'
    });


    //Limpiamos el texto para que el user pueda preguntar mas 
    this.Pregunta = '';
    this.cargando = true;

    this.iaService.preguntar(preguntaUsuario).subscribe({
      next: (res) => {

        this.mensajes.push({
          texto: res,
          //Tipo para el frontend se vea mas decorativo
          tipo: 'bot'
        });

        this.cargando = false;
      },
      error: () => this.cargando = false
    });

  }


}
