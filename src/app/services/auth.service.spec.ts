import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";

// Mock para ApiService
class MockApiService {}

describe("AuthService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            { provide: 'ApiService', useClass: MockApiService }
        ]
    }));

    it("should be created", () => {
        const service: AuthService = TestBed.inject(AuthService);
        expect(service).toBeTruthy();
    });
});
