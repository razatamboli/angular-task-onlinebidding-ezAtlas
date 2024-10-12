import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = next.data.role;
    const currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    }

    // Not authorized, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
  
}
