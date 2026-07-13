import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';

interface Config {
  sourceSystem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config | null = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<Config> {
    if (!environment.production && environment.apiUrl) {
      const localConfig: Config = { sourceSystem: environment.apiUrl };
      this.setConfig(localConfig);
      return of(localConfig);
    }
    return this.http.get<Config>('assets/config/config.json').pipe(
      tap(config => this.setConfig(config))
    );
  }

  getConfig(): Config | null {
    return this.config;
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
