import { Component } from '@angular/core';
import { ChatService } from '../../../../../shared/services/asesoria/chatGpt/chat.service';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.scss']
})
export class AsesorComponent {

  mensaje: string = '';
  mensajeChat: string = '';
  mensajePila: string[] = [];

  constructor(private _chatService: ChatService) { }

  submit() {
    this.mensajePila.push(this.mensaje); // Agrega el mensaje del usuario a la variable mensaje
    // ... lógica para procesar la respuesta del asistente ...
    this.obtenerMensajeChat(this.mensaje)
      .then((value: string) => {
        this.mensajeChat = value;
      })
      .catch((reason: any) => {
        console.log(reason)
      });
    // this.mensajeChat añadir a la lista
    this.mensajePila.push("Respuestas")
    this.mensaje = ''; // Limpia el campo de texto del usuario
  }

  async obtenerMensajeChat(message: string): Promise<string> {
    const respuesta = await new Promise<string>((resolve, reject) => {
      this._chatService.getMessageChat(message).subscribe(
        {
          next: (value: string) => {
            resolve(value);
          },
          error: (err: any) => {
            reject(err)
          },
          complete: () => {
            //
          }
        }
      )
    })
    return respuesta
  }
}

