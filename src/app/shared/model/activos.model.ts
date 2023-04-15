import { SectorActivo } from "./enums/sectoractivo";
import { TipoActivo } from "./enums/tipoactivo";


export interface Ahorro {
  nombre: string;
  descripcion: string;
  tipo: TipoActivo;
  cantidad: number;
  sector: SectorActivo;
}
