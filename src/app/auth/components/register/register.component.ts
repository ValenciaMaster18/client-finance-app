import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { User } from 'src/app/shared/model/usuario.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../../assets/css/auth/forms.scss']
})
export class RegisterComponent {
  username: string | null = "";

  formularioValidarCorreo: FormGroup;
  formularioRegistrarUsuario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

    this.formularioValidarCorreo = this.formBuilder.group(
      {
        username: ['', Validators.required, Validators.email]
      }
    )

    this.formularioRegistrarUsuario = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.activatedRoute.paramMap.subscribe(
      {
        next: (value: ParamMap) => {
          if (value.get("username") != ''){
            this.username = value.get("username");
          }
        }
      }
    )
  }

  submitFormularioValidarCorreo(): void{
    if(this.formularioRegistrarUsuario.valid){
      const username: string = this.formularioValidarCorreo.value.username;
      this._usuarioService.getUsuarioSiExiste(username).subscribe(
        {
          next: (value: boolean) => {
            if(value){
              this.router.navigate([`/auth/login/${username}`])
              return
            }
            this.username = username;
          }
        }
      )
    }
  }
  submitFormularioRegistrarUsuario(): void{
    const username: string = this.formularioValidarCorreo.value.username;
    if(this.formularioRegistrarUsuario.valid){
      const password: string = this.formularioRegistrarUsuario.value.password;
      const user: User = {
        id: null,
        username: username,
        password: password,
        authority: "ROLE_USUARIO"
      }
      this._usuarioService.postRegistrarNuevoUsuario(user).subscribe(
        {
          next: (value: any) => {
            if(value){
              this.router.navigate([`/auth/login/${username}`])
              return
            }
          }
        }
      )
    }
  }
}
