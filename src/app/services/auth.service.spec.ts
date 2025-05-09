import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";

class MockApiService {}

describe("AuthService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            { provide: "ApiService", useClass: MockApiService }
        ]
    }));

    it("should be created", () => {
        const service: AuthService = TestBed.inject(AuthService);
        expect(service).toBeTruthy();
    });
});
