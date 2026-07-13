import { Injectable } from '@angular/core';

const USER_EMAIL_KEY = 'userEmail';
const USER_NAME_KEY = 'userName';

@Injectable({ providedIn: 'root' })
export class UserService {

  getEmail(): string {
    let email = localStorage.getItem(USER_EMAIL_KEY);
    if (!email) {
      email = `guest_${crypto.randomUUID()}@rider.local`;
      localStorage.setItem(USER_EMAIL_KEY, email);
    }
    return email;
  }

  getName(): string {
    return localStorage.getItem(USER_NAME_KEY) || 'Rider';
  }

  setLocalProfile(name: string, email: string): void {
    localStorage.setItem(USER_NAME_KEY, name);
    localStorage.setItem(USER_EMAIL_KEY, email);
  }
}
