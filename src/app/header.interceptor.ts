
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    Subject,
    finalize,
    tap
} from 'rxjs';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(
        private httpClient: HttpClient,
        private _snackbar: MatSnackBar,
        private _auth: AuthService,
        private _router: Router,
        private _dialog: MatDialog
    ) { }

    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
        if (!httpRequest.url.includes('assets')) {
            return next.handle(
                httpRequest.clone({
                    url: httpRequest.url.includes('match') ? '' : environment.api_url + httpRequest.url,
                    setHeaders: {
                        Authorization: `Bearer ${this._auth.getToken()}`
                    }
                })
            ).pipe(
                tap({
                    // Succeeds when there is a response; ignore other events
                    next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                    // Operation failed; error is an HttpErrorResponse
                    error: (_error: HttpErrorResponse) => {
                        if (_error.status === 412 || _error.status === 500 || _error.status === 401) {
                            this._snackbar.open(_error.error['message'], 'X', {
                                horizontalPosition: 'end',
                                verticalPosition: 'bottom',
                                duration: 3000
                            });
                        }

                        if ( _error.status === 401) {
                            this._auth.logout();
                            this._dialog.closeAll();
                            this._router.navigate(['/login']);
                        }

                        ok = 'failed'
                    }
                }),
                // Log when response observable either completes or errors
                finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `${httpRequest.method} "${httpRequest.urlWithParams}" ${ok} in ${elapsed} ms.`;
                    console.error(msg)
                })
            );;
        }

        return next.handle(httpRequest);
    }
}
