export interface Condicion {
  id: number | null | string;
  expresion: string;
  importe: number;
  tipoImporte: string;
  enabled: boolean;
  idAhorro?: string;
}
