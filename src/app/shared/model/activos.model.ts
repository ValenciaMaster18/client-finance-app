import { SectorActivo } from "./enums/sectoractivo";
import { TipoActivo } from "./enums/tipoactivo";


export interface Activo {
  nombre: string;
  descripcion: string;
  tipo: TipoActivo;
  cantidad: number;
  sector: SectorActivo;
}
