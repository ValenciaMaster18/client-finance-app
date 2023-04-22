import { ImporteConcepto } from "../importconcepto.model";
export interface Balance {
  ingresos: {[categoria: string]: {monto: number, porcentaje: number}};
  egresos: {[categoria: string]: {monto: number, porcentaje: number}};
}

export interface MetricaBalance {
  monto: number;
  mostraMetricas: boolean;
  proporcionPorTipo: {[tipo: string]: number};
  detalleImporteConceptoPorTipo: Balance;
}
