import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard {
    private readonly router = inject(Router);

    canActivate: CanActivateFn = () => {
        if (AuthService.isLogged()) {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    };
}
