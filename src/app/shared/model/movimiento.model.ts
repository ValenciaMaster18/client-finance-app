export interface Movimiento {
  id: number | null;
  importe: number;
  tipo: string | null;
  concepto: string;
  idUsuario: number | null;
  idPresupuesto: number | null;
  contabilizable: boolean;
  logoConcepto: string;
}
