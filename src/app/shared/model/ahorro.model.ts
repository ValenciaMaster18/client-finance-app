import { Condicion } from "./condicion.model";
import { Objetivo } from "./objetivo.model";

export interface Ahorro {
  id: number | null | string;
  nombre: string;
  descripcion: string;
  tipo: string;
  importe: number;
  automatico: boolean;
  idObjetivo: number | null | string;
  idUsuario: number | null | string;
  condicion?: Condicion;
}
