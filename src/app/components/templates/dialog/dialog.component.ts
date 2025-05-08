import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-dialog",
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: "./dialog.component.html",
    styleUrl: "./dialog.component.scss"
})
export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { title: string; message: string; btnOkText: string; btnCancelText: string }
    ) { }

    public decline(): void {
        this.dialogRef.close(false);
    }

    public accept(): void {
        this.dialogRef.close(true);
    }
}
