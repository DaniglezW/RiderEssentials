import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

export interface UserProfile {
  userId: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private apiUrl = '';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private userService: UserService
  ) {
    const config = this.configService.getConfig();
    this.apiUrl = config ? config.sourceSystem : '';
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/users/profile`).pipe(
      tap((p) => this.userService.setLocalProfile(p.name, p.email))
    );
  }

  updateProfile(name: string, email: string): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/profile`, { name, email }).pipe(
      tap((p) => this.userService.setLocalProfile(p.name, p.email))
    );
  }
}
