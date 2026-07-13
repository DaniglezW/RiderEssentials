import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@/app/services/user.service';

@Injectable()
export class UserEmailInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const email = this.userService.getEmail();
    const cloned = req.clone({
      setHeaders: { 'X-User-Email': email },
    });
    return next.handle(cloned);
  }
}
