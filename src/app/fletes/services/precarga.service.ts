import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Precarga } from '../interfaces/precarga';

@Injectable({
  providedIn: 'root',
})
export class PrecargaService {
  constructor(private httpClient: HttpClient) {}

  getPrecargas(empresa: string): Observable<Precarga[]> {
    return this.httpClient.get<Precarga[]>(
      `http://localhost:3000/precargas/${empresa}`
    );
  }

  deletePrecarga(empresa: string, id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/precarga`, {
      body: { empresa, id },
    });
  }

  postPrecarga(precarga: Precarga): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:3000/precarga`,
      precarga,
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
