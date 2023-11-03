import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from './core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private dialog:MatDialog,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //the only request that already has an auth header is refresh, which will not be affected by this interceptor
    if (request.headers.has('Authorization')) {
      return next.handle(request);
    }

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              return this.userService.Refresh(refreshToken).pipe(
                switchMap((refreshResult) => {
                  console.log('Successfully updated access token');
                  localStorage.setItem('accessToken', refreshResult.accessToken);
                  const updatedRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${refreshResult.accessToken}`,
                    },
                  });
                  return next.handle(updatedRequest);
                }),
                catchError((refreshError) => {

                  if (this.dialog.openDialogs.length > 0) {
                    this.dialog.closeAll();
                  }
                  
                  this.snackbarService.open("This session has run out. You have been logged out")
                  this.userService.logoutUser();
                  this.router.navigate(["/login"])
                  .then(() => {
                    window.scrollTo(0,0);
                  });

                  return throwError(refreshError);
                })
              );
            } else {
              return throwError('No refresh token available');
            }
          } else {
            return throwError(error);
          }
        })
      );
    }

    return next.handle(request);
  }
}
