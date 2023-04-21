import { Component } from '@angular/core';
import { ChatService } from '../../../../../shared/services/asesoria/chatGpt/chat.service';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

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

  async submit() {
    this.mensajePila.push(this.mensaje); // Agrega el mensaje del usuario a la variable mensaje
    // ... lógica para procesar la respuesta del asistente ...
    // const promesa = await new Promise<string>((resolve, reject) => {
    //   this.obtenerMensajeChat(this.mensaje)
    //     .then((value: string) => {
    //       console.log(value)
    //       this.mensajeChat = value;
    //       this.mensajePila.push(this.mensajeChat); // Agrega el mensaje del asistente a la lista
    //       this.mensaje = ''; // Limpia el campo de texto del usuario
    //       resolve(value); // Resuelve la promesa con el valor del mensaje del asistente
    //     })
    //     .catch((reason: any) => {
    //       console.log("error 3" + reason)
    //       reject(reason); // Rechaza la promesa con la razón del error
    //     });
    // });
    this._chatService.getMessageChat(this.mensaje).subscribe(
      {
        next: (value: any) => {
          this.mensajeChat = value.anwer;
          this.mensajePila.push(this.mensajeChat); // Agrega el mensaje del asistente a la lista
          this.mensaje = ''; // Limpia el campo de texto del usuario
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

  // async obtenerMensajeChat(message: string): Promise<string> {
  //   const respuesta = await new Promise<string>((resolve, reject) => {
  //     this._chatService.getMessageChat(message).subscribe(
  //       {
  //         next: (value: string) => {
  //           console.log("satisfactorio 1" + value)

  //           resolve(value);
  //         },
  //         error: (err: any) => {
  //         console.log("error 1" + err)

  //           reject(err)
  //         },
  //         complete: () => {
  //           //
  //         }
  //       }
  //     )
  //   }).then((value: string) => {
  //     return value;
  //   }).catch((reason: any) => {
  //     console.log("error 2" + reason)
  //     return reason;
  //   })
  //   return respuesta;
  // }
}

