import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard2Service } from './auth-guard2.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authGuard2:AuthGuard2Service,private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authGuard2.isAuthenticated()
      .then(
        (authentificated) => {
          if (authentificated) {
            return true;
          } else { 
            return this.router.navigate(['/login']);
          }
        }
      );
      
  }
}
