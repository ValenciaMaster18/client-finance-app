import { Temporabilidad } from "../enums/temporalidad";

export interface MetricaPresupuesto{
  ingresoNecesarioMinimo: number;
  ingresoDisponible: number;
  temporalidad: Temporabilidad;
  conceptos: [{[tipo: string]: number}];
  relacionTipoMovimiento: [{[tipo: string]: number}];
}

