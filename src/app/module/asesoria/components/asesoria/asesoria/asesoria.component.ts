import { Component } from '@angular/core';
import { ChatService } from '../../../../../shared/services/asesoria/chatGpt/chat.service';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.scss']
})
export class AsesorComponent {
  estadoEnvio: boolean = false;
  mensaje: string = '';
  mensajeChat: string = '';
  mensajePila: string[] = [];

  constructor(private _chatService: ChatService) { }

  async submit() {
    this.mensajePila.push(this.mensaje); // Agrega el mensaje del usuario a la variable mensaje
    this.estadoEnvio = true;
    this._chatService.getMessageChat(this.mensaje).subscribe(
      {
        next: (value: any) => {
          this.mensajeChat = value.anwer;
          this.mensajePila.push(this.mensajeChat); // Agrega el mensaje del asistente a la lista
          this.mensaje = ''; // Limpia el campo de texto del usuario
          this.estadoEnvio = false;
        },
        error: (err: any) => {
          console.log(err)
          this.mensajeChat = err;
          this.mensajePila.push(this.mensajeChat); // Agrega el mensaje del asistente a la lista
          this.mensaje = ''; // Limpia el campo de texto del usuario
        }
      }
    )
  }
}

