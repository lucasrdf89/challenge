import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { ErrorInterceptorService } from "./services/error-interceptor.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(HttpClientModule),
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
    ]
};
