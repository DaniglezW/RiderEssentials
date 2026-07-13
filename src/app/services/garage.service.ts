import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { ConfigService } from './config.service';
import { Motorcycle } from '../model/motorcycle';

@Injectable({ providedIn: 'root' })
export class GarageService {
  private bikes: Motorcycle[] = [];
  private subject = new BehaviorSubject<Motorcycle[]>([]);

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.load();
  }

  private getApiUrl(): string {
    return this.configService.getConfig()?.sourceSystem || '';
  }

  private mapBike(dto: any): Motorcycle {
    return {
      id: String(dto.bikeId),
      bikeId: dto.bikeId,
      make: dto.make,
      model: dto.model,
      year: dto.year,
      nickname: dto.nickname,
      isPrimary: dto.isPrimary,
    };
  }

  private load(): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.get<any[]>(`${apiUrl}/garage/bikes`).pipe(
      tap((bikes) => {
        this.bikes = bikes.map((b) => this.mapBike(b));
        this.subject.next([...this.bikes]);
      }),
      catchError(() => of([]))
    ).subscribe();
  }

  getBikes(): Observable<Motorcycle[]> {
    return this.subject.asObservable();
  }

  getPrimaryBike(): Motorcycle | null {
    return this.bikes.find((b) => b.isPrimary) || this.bikes[0] || null;
  }

  addBike(bike: Omit<Motorcycle, 'id' | 'bikeId'>): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.post(`${apiUrl}/garage/bikes`, {
      make: bike.make,
      model: bike.model,
      year: bike.year,
      nickname: bike.nickname,
    }).pipe(tap(() => this.load())).subscribe();
  }

  removeBike(id: string): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.delete(`${apiUrl}/garage/bikes/${id}`).pipe(
      tap(() => this.load())
    ).subscribe();
  }

  setPrimary(id: string): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.put(`${apiUrl}/garage/bikes/${id}/primary`, {}).pipe(
      tap(() => this.load())
    ).subscribe();
  }
}
