import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { UtilsService } from '../services/utils.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const utilService = inject(UtilsService);
  utilService.cargando(true);
  return next(req).pipe(
    finalize(()=>{
      utilService.cargando(false);
    })

  );
};