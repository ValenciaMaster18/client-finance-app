export interface Movimiento {
  id: number | null | string;
  importe: number;
  tipo: string | null;
  concepto: string;
  idUsuario: number | string | null;
  idPresupuesto: number | string | null;
  contabilizable: boolean;
  logoConcepto: string;
}
