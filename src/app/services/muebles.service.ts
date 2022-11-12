import { Injectable } from '@angular/core';
import { Mueble } from '../fletes/interfaces/mueble';

@Injectable({
  providedIn: 'root',
})
export class MueblesService {
  muebles: Mueble[] = [
    {
      nombre: 'Cama',
      cantidad: 0,
    },
    {
      nombre: 'Silla',
      cantidad: 0,
    },
    {
      nombre: 'Mesa',
      cantidad: 0,
    },
    {
      nombre: 'Sofá',
      cantidad: 0,
    },
    {
      nombre: 'Escritorio',
      cantidad: 0,
    },
    {
      nombre: 'Armario',
      cantidad: 0,
    },
    {
      nombre: 'Librero',
      cantidad: 0,
    },
    {
      nombre: 'Refrigerador',
      cantidad: 0,
    },
    {
      nombre: 'Lavadora',
      cantidad: 0,
    },
    {
      nombre: 'Televisor',
      cantidad: 0,
    },
    {
      nombre: 'Otros',
      cantidad: 0,
    },
  ];
  constructor() {}

  getMuebles(): Mueble[] {
    return this.muebles;
  }

  updateMueble(mueble: Mueble) {
    const index = this.muebles.findIndex((m) => m.nombre === mueble.nombre);
    this.muebles[index] = mueble;
  }
}
