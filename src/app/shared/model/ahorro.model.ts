import { Condicion } from "./condicion.model";
import { Objetivo } from "./objetivo.model";

export interface Ahorro{
id: number;
tipo: string;
importe: number;
automatico: boolean;
objetivo: Objetivo;
condicion: Condicion;
}
