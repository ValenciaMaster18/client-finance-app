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
  ) {

    this.formularioValidarCorreo = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]]
      }
    )

    this.formularioRegistrarUsuario = this.formBuilder.group({
      password: ['', [Validators.required]]
    });

    this.activatedRoute.paramMap.subscribe(
      {
        next: (value: ParamMap) => {
          if (value.get("username") != '') {
            this.username = value.get("username");
          }
        }
      }
    )
  }

  submitFormularioValidarCorreo(): void {
    if (this.formularioValidarCorreo.valid) {
      const username: string = this.formularioValidarCorreo.value.username;
      this._usuarioService.getUsuarioSiExiste(username).subscribe(
        {
          next: (value: boolean) => {
            if (value) {
              console.log(this.username)
              this.router.navigate([`/auth/login/${username}`])
            }
            this.username = username;
          }
        }
      )
    }
  }
  submitFormularioRegistrarUsuario(): void {
    console.log(this.formularioRegistrarUsuario.value.password)
    console.log("Formulario valid" + this.formularioRegistrarUsuario.valid)
    if (this.formularioRegistrarUsuario.valid) {
      const password: string = this.formularioRegistrarUsuario.value.password;
      const user: User = {
        id: null,
        username: this.username!,
        password: password,
        authority: "ROLE_USUARIO"
      }
      this._usuarioService.postRegistrarNuevoUsuario(user).subscribe(
        {
          next: (value: any) => {
            if (value) {
              console.log(value)
              console.log(this.username)
              this.router.navigate([`/auth/login/${this.username}`])
            }
          }
        }
      )
    }
  }
}
