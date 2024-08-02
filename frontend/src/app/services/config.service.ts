import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<Config>('assets/config/config.json');
  }

  getConfig(): Config | null {
    return this.config;
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
