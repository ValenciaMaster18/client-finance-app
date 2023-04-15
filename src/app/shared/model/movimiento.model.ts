export interface Movimiento {
  id: number;
  importe: number;
  tipo: string;
  concepto: string;
  idUsuario: number;
  idPresupuesto: number;
  contabilizable: boolean;
  logoConcepto: string;
}
