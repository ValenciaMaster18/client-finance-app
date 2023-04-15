enum TipoActivo{
  ACCIONES,
  BONOS,
  FONDOS_MUTUOS,
  MATERIAS_PRIMAS,
  CRIPTOMONEDAS,
  OTROS
}
enum SectorActivo {
  FINANCIERO,
  TECNOLOGICO,
  CONSTRUCTIVO,
  COMERCIAL,
  OTROS
}
export interface Ahorro {
  nombre: string;
  descripcion: string;
  tipo: TipoActivo;
  cantidad: number;
  sector: SectorActivo;
}
