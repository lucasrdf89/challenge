import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class ErrorInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        const clonedReq = req.clone({
            headers: req.headers.set("Authorization", token ? `Bearer ${token}` : "")
        });

        return next.handle(clonedReq).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    AuthService.logout();
                    window.location.reload();
                }

                const error = err.error?.message || err.statusText || "Unknown error";
                return throwError(() => new Error(error));
            })
        );
    }
}
