export interface IUsuario {
  iat?: number;
  exp?: number;
  role?: 'ROLE_ADMINISTRADOR' | 'ROLE_USUARIO';
  uuid?: string;
}
