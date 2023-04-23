import { Inversiones } from "./inversiones.model";

export interface Portafolio {
  id: number | string | null;
  nombre: string;
  descripcion: string;
  inversiones?: Inversiones[];
  idUsuario: number | string | null;
  idObjetivo: number | string | null;
}
