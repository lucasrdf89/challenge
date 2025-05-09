import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                HttpClientTestingModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: AuthService, useValue: {} },
                { provide: ApiService, useValue: {} }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
