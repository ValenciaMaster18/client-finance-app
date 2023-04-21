export interface Objetivo {
  id: number | string | null;
  nombre: string;
  descripcion: string;
  fechaEstimada: Date;
  monto: number;
  idUsuario: number | string | null;
}
