import { Movimiento } from "./movimiento.model";

export interface Presupuesto {
  id: number | string | null;
  nombre: string;
  descripcion: string;
  periodo: string;
  idUsuario: number | string | null;
  movimientos?: Movimiento[];
}
