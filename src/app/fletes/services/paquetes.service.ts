import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paquete } from '../interfaces/paquete';

@Injectable({
  providedIn: 'root',
})
export class PaquetesService {
  constructor(private httpClient: HttpClient) {}

  getPaquetes(flete: string): Observable<Paquete[]> {
    return this.httpClient.get<Paquete[]>(
      `${environment.api}/paquetes/${flete}`
    );
  }

  deletePaquete(paquete: Paquete): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/paquete`, {
      body: { paquete },
    });
  }
}
