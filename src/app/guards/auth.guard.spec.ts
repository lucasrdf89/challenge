import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
    let guard: AuthGuard;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: Router, useValue: routerSpy }
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should return true if user is authenticated", () => {
        spyOn(AuthService, "isLogged").and.returnValue(true);
        const mockRoute: any = {};
        const mockState: any = {};
        expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it("should return false and navigate to /login if user is not authenticated", () => {
        spyOn(AuthService, "isLogged").and.returnValue(false);
        const mockRoute: any = {};
        const mockState: any = {};
        expect(guard.canActivate(mockRoute, mockState)).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"]);
    });
});
