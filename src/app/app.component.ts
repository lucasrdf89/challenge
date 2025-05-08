import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, MatInputModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    title = "atom-challenge-fe-template";
}
