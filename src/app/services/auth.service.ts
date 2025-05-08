import { inject, Injectable } from "@angular/core";

import { ApiService } from "./api.service";

const TOKEN = "token";
const PATH = "auth/";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly apiService = inject(ApiService);

    static isLogged(): boolean {
        const token = localStorage.getItem(TOKEN);
        return !!token && token.length > 0;
    }

    static logout(): void {
        localStorage.removeItem(TOKEN);
    }

    async doLogin(email: string): Promise<boolean> {
        return this.authenticate("login", email);
    }

    async register(email: string): Promise<boolean> {
        return this.authenticate("register", email);
    }

    private async authenticate(endpoint: "login" | "register", email: string): Promise<boolean> {
        const resp: any = await this.apiService.post(`${PATH}${endpoint}`, { email });

        if (resp?.status) {
            const { token } = resp.data.resp;
            localStorage.setItem(TOKEN, token);
            return true;
        }

        return false;
    }
}
