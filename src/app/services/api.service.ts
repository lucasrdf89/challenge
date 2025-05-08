import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    }),
    context: new HttpContext()
};
const { API_URL } = environment;

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private http = inject(HttpClient);

    private call<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        url: string,
        data?: T
    ): Promise<{ status: boolean; data: T }> {
        const fullUrl: string = `${API_URL}${url}`;
        let query: Promise<T>;

        switch (method) {
            case "POST":
                query = this.http
                    .post<T>(fullUrl, data, httpOptions)
                    .toPromise()
                    .then((result) => result as T);
                break;
            case "GET":
                query = this.http
                    .get<T>(fullUrl, httpOptions)
                    .toPromise()
                    .then((result) => result as T);
                break;
            case "PUT":
                query = this.http
                    .put<T>(fullUrl, data, httpOptions)
                    .toPromise()
                    .then((result) => result as T);
                break;
            case "DELETE":
                query = this.http
                    .delete<T | undefined>(fullUrl, httpOptions)
                    .toPromise()
                    .then((result) => result as T);
                break;
            default:
                return Promise.reject(new Error("Invalid HTTP method"));
        }

        return query
            .then((info: T) => ({ status: true, data: info }))
            .catch((err) => ({ status: false, data: err }));
    }

    get<T>(url: string): Promise<{ status: boolean; data: T }> {
        return this.call<T>("GET", url);
    }

    post<T>(url: string, data: T): Promise<{ status: boolean; data: T }> {
        return this.call<T>("POST", url, data);
    }

    put<T>(url: string, data: T): Promise<{ status: boolean; data: T }> {
        return this.call<T>("PUT", url, data);
    }

    delete<T>(url: string): Promise<{ status: boolean; data: T }> {
        return this.call<T>("DELETE", url);
    }
}
