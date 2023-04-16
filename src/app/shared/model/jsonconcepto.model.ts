export interface Categoria {
  id: number;
  logoConcepto: string;
  concepto: string;
  color: string;
  selected: boolean
}

export interface JsonConcepto {
  ingreso: Categoria[];
  egreso: Categoria[];
}
