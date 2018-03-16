import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Guard is casual service that should implement CanActivate interface
// To use it we should add "canActivate :[RoutGuardService]" to the route
@Injectable()
export class RoutGuardService implements CanActivate {
  
  // this is method that works before route will be 
  // done(conponents will be generated).It can return several tupes and  also boolean too
  // if true rout will be accessible,if not route wont be accesible
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
    return true;
  }

  constructor(router:Router) { }

}
