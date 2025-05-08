import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";

@Component({
    selector: "app-toolbar",
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"] // Corrección: styleUrls en plural
})
export class ToolbarComponent {
    private readonly router = inject(Router);

    logout(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.router.navigate(["login"]);
    }
}
