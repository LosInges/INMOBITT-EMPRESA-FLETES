import { Direccion } from './direccion';

export interface Precarga {
  id: string;
  cajasChicas: number;
  cajasGrandes: number;
  cajasMedianas: number;
  muebles: number;
  empresa: string;
  cliente: string;
  destino: Direccion;
  fecha: string;
  hora: string;
  origen: Direccion;
  telefono: string;
}
