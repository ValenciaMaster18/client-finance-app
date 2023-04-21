export interface Inversiones {
  id?: number | null | string;
  idPortafolio: number | null | string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  plazo: string;
  perfilRiesgo: string;
  tipo: string;
  sector: string;
  rentabilidadEsperada: number;
  simulada: boolean;
}
