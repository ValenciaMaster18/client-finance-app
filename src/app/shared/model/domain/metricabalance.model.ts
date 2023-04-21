import { ImporteConcepto } from "../importconcepto.model";

export interface MetricaBalance {
  monto: number;
  mostraMetricas: boolean;
  proporcionPorTipo: {[tipo: string]: number};
  detalleImporteConceptoPorTipo: {[tipo: string]: {[concepto: string]: ImporteConcepto}};
}
