import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transporte } from '../interfaces/transporte';

@Injectable({
  providedIn: 'root',
})
export class TransportesService {
  constructor(private httpClient: HttpClient) {}

  getTransportes(empresa: string): Observable<Transporte[]> {
    return this.httpClient.get<Transporte[]>(
      `http://localhost:3000/transportes/${empresa}`
    );
  }

  getTransporte(empresa: string, matricula: string): Observable<Transporte[]> {
    return this.httpClient.get<Transporte[]>(
      `http://localhost:3000/transporte/${empresa}/${matricula}`
    );
  }

  postTransporte(transporte: Transporte): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:3000/transporte`,
      transporte,
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteTransporte(transporte: Transporte): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/transporte`, {
      body: transporte,
    });
  }
}
