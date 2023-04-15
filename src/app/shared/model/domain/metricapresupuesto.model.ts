export interface MetricaPresupuesto{
  ingresoNecesarioMinimo: number;
  ingresoDisponible: number;
  temporalidad: string;
  conceptos: {[tipo: string]: number};
  relacionTipoMovimiento: {[tipo: string]: number};
}

