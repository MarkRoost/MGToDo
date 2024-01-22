import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
):  Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token')
  const router = inject(Router)
  let cloneReq = req

  if (token) {
    const myHeader = new HttpHeaders()
    myHeader.set('Authorization', 'Bearer ' + token);
    myHeader.set('Access-Control-Allow-Origin', '*');
    myHeader.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    cloneReq = req.clone({
      headers: myHeader
    });
  }



return next(cloneReq)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          console.log('error', err.status)
          switch (err.status) {
            case 0:
              // do something
              console.log('redirect to login')
              window.alert('Sorgente dati non disponibile')
              // router.navigateByUrl('demo1')
              break;

            case 401:
            case 404:
              // do something
              console.log('redirect to login')
              break;

            //...
          }
        }
        return throwError(err);
      })
    )

}
