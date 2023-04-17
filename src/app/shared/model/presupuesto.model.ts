import { Movimiento } from "./movimiento.model";

export interface Presupuesto {
  id: number;
  nombre: string;
  descripcion: string;
  periodo: string;
  idUsuario: number;
  movimientos?: Movimiento[];
}
