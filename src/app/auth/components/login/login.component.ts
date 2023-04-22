import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../assets/css/auth/forms.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formularioValidarCorreo: FormGroup;
  formularioIniciarSesion: FormGroup;

  emailUserSiExiste: string = '';
  emailUserUrl: string | null = null;
  existeElCorreo: boolean = false;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router

  ) {
    this.subscription = new Subscription()
    this.formularioIniciarSesion = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
    this.formularioValidarCorreo = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]]
      }
    )

  }
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      {
        next: (value: ParamMap) => {
          if (value.get("username") != '') {
            this.emailUserUrl = value.get("username")
          }
        }
      }
    )
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  submitValidarCorreoExistencia(): void {
    if (this.formularioValidarCorreo.valid) {
      const username: string = this.formularioValidarCorreo.value.username;
      this.subscription = this._usuarioService.getUsuarioSiExiste(username).subscribe(
        {
          next: (value: boolean) => {
            if (value) {
              console.log(value)

              this.emailUserSiExiste = username;
              this.existeElCorreo = true;
            } else {
              this.existeElCorreo = false;
              this.router.navigate([`/auth/register/${username}`])
            }
          },
          error: (value: any) => {
            console.log(value)
          }

        }
      )
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Correo invalido',
        showConfirmButton: false,
        timer: 3000
      })
    }

  }
  submitEntrarAlSistema(): void {
    let username: string = ''
    if (this.emailUserUrl) {
      username = this.emailUserUrl;
    } else {
      username = this.formularioValidarCorreo.value.username;
    }
    if (this.formularioIniciarSesion.valid) {
      const password: string = this.formularioIniciarSesion.value.password;
      this.subscription = this._authService.getAutenticacion(username, password)
        .subscribe(
          {
            next: () => {
              this._usuarioService.username = username;
              this.router.navigate(['/dashboard'])
            },
            error: (value: any) => {
              //
            }
          }
        )
    }
  }
}
