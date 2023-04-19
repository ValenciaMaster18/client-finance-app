export interface User {
  id: number | null;
  username: string;
  password: string;
  authority?: "ROLE_ADMINISTRADOR" | "ROLE_USUARIO";
}
