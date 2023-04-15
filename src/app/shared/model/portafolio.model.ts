import { Inversiones } from "./inversiones.model";

export interface Portafolio {
  id: number;
  nombre: string;
  descripcion: string;
  inversiones: Inversiones[];
  idUsuario: number;
  idObjetivo: number;
}
