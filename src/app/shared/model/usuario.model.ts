export interface User {
  id: number | string | null;
  username: string;
  password: string;
  authority?: "ROLE_ADMINISTRADOR" | "ROLE_USUARIO";
}
