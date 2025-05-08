import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
    FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth.service";
import { NotificationService } from "../../../services/notification.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatCardModule, MatProgressSpinnerModule
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent implements OnInit {
    loading: boolean = false;
    readonly form: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
    });

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly notification = inject(NotificationService);

    ngOnInit(): void {
        if (AuthService.isLogged()) {
            this.router.navigate(["tasks"]);
        }
    }

    async onSubmit(e: Event): Promise<void> {
        e.preventDefault();
        this.loading = true;
        if (this.form.valid) {
            const resp: boolean = await this.authService.doLogin(this.form.value.email);
            if (resp) {
                this.router.navigate(["tasks"]);
            } else {
                const registrationResp: boolean = await this.authService.register(this.form.value.email);
                if (registrationResp) {
                    this.notification.success("User registered successfully");
                    setTimeout(() => {
                        this.router.navigate(["tasks"]);
                    }, 2000);
                } else {
                    this.notification.error("Error registering user");
                }
            }
            this.loading = false;
        }
    }
}
