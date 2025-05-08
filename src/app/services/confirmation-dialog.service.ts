import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { DialogComponent } from "../components/templates/dialog/dialog.component";

@Injectable({
    providedIn: "root"
})
export class ConfirmationDialogService {
    constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

    confirm(
        title: string,
        message: string,
        btnOkText: string = "Confirmar",
        btnCancelText: string = "Cancelar",
        dialogSize: "sm" | "lg" = "lg"
    ): Promise<boolean> {
        const isSmallScreen: boolean = this.breakpointObserver.isMatched("(max-width: 600px)");
        let width: string;

        if (isSmallScreen) {
            width = "90%";
        } else if (dialogSize === "lg") {
            width = "600px";
        } else {
            width = "300px";
        }

        const dialogRef = this.dialog.open(DialogComponent, {
            width,
            panelClass: "custom-dialog-container",
            data: {
                title, message, btnOkText, btnCancelText
            }
        });

        return dialogRef.afterClosed().toPromise().then((resp) => !!resp).catch(() => false);
    }
}
