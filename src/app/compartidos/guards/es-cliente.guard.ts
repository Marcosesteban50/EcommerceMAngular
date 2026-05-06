import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/seguridad.service';

export const esClienteGuard: CanActivateFn = (route, state) => {



  const router = inject(Router);
  const seguridadService = inject(SeguridadService);

  if (seguridadService.obtenerRol() === 'Cliente' || seguridadService.obtenerRol() == 'Admin') {
    return true;
  }

  router.navigate([''])

  return true;

};
