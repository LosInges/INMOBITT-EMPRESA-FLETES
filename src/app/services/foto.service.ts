import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  public photos: UserPhoto[] = [];
  constructor(private httpClient: HttpClient) {}

  async tomarFoto() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  subirMiniatura(datos: FormData): Observable<object> {
    return this.httpClient.post<object>(`${environment.api}/miniatura`, datos);
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
