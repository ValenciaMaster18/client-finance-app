export interface MetricaPortafolio {
  mostraMetricas: boolean;
  idPortafolio: number;
  valorTotal: number;
  rentabilidadPromedio: number;
  gananciaEsperada: number;
  plazo: string;
  nivelRiesgo: string;
  sectores: {[tipo: string]: number};
}
