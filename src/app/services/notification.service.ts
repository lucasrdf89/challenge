import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    private sendMsg(msg: string = "", timer: number = 3000): void {
        this.snackBar.open(msg, "Cerrar", {
            duration: timer,
            verticalPosition: "top"
        });
    }

    success(msg: string, icon: string = "✅"): void {
        return this.sendMsg(`${icon} ${msg}`);
    }

    warning(msg: string, icon: string = "⚠️"): void {
        return this.sendMsg(`${icon} ${msg}`);
    }

    error(msg: string, icon: string = "❌"): void {
        return this.sendMsg(`${icon} ${msg}`);
    }
}
