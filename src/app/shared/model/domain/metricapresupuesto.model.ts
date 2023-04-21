import { Temporabilidad } from "../enums/temporalidad";

export interface MetricaPresupuesto {
  idPresupuesto: number | string | null;
  mostraMetricas: boolean;
  ingresoNecesarioMinimo: number;
  ingresoDisponible: number;
  temporalidad: Temporabilidad;
  conceptos: [{ [tipo: string]: number }];
  relacionTipoMovimiento: [{ [tipo: string]: number }];
}

