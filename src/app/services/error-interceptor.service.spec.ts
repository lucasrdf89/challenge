import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ErrorInterceptorService } from "./error-interceptor.service";

describe("ErrorInterceptorService", () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
            ]
        });
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        const service: ErrorInterceptorService = TestBed.inject(ErrorInterceptorService);
        expect(service).toBeTruthy();
    });

    it("should pass through successful requests", () => {
        const mockData = { foo: "bar" };
        http.get("/test").subscribe((data) => {
            expect(data).toEqual(mockData);
        });
        const req = httpMock.expectOne("/test");
        req.flush(mockData);
        httpMock.verify();
    });

    it("should handle HTTP errors", (done) => {
        const errorMsg = "Not Found";
        http.get("/error").subscribe({
            next: () => {
                fail("should have failed with 404 error");
                done();
            },
            error: (error: Error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Not Found");
                done();
            }
        });
        const req = httpMock.expectOne("/error");
        req.flush({ message: errorMsg }, { status: 404, statusText: "Not Found" });
        httpMock.verify();
    });
});
