import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { ConfirmationDialogService } from "../../services/confirmation-dialog.service";

@Component({
    selector: "app-table",
    standalone: true,
    imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule],
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends { checked?: boolean }> implements OnChanges {
    @Input() title: string = "";
    @Input() cols: string[] = [];
    @Input() data: T[] = [];
    @Input() btnAdd: boolean = false;
    @Input() btnDelete: boolean = false;
    @Input() btnEdit: boolean = false;
    @Input() checkInput: boolean = false;
    @Output() modalOpenedEvent: EventEmitter<{ isEdit: boolean; row?: T }> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<T> = new EventEmitter();
    @Output() updateEvent: EventEmitter<T> = new EventEmitter();

    readonly selection = new SelectionModel<T>(true, []);
    readonly dialogService = inject(ConfirmationDialogService);

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
    isEmpty: boolean = true;

    ngOnChanges(): void {
        this.updateDisplayedColumns();
        this.updateDataSource();
    }

    private updateDisplayedColumns(): void {
        this.displayedColumns = [...this.cols];
        if (this.btnEdit || this.btnDelete) {
            this.displayedColumns.push("actions");
        }
        if (this.checkInput) {
            this.displayedColumns.unshift("checked");
        }
    }

    private updateDataSource(): void {
        this.dataSource = new MatTableDataSource<T>(this.data);
        this.isEmpty = this.dataSource.data.length === 0;
    }

    checkboxLabel(row: T): string {
        return `${this.selection.isSelected(row) ? "deselect" : "select"} row`;
    }

    modalOpened(isEdit: boolean = false, row?: T): void {
        this.modalOpenedEvent.emit({ isEdit, row });
    }

    async deleteItem(e: Event, row: T): Promise<void> {
        e.preventDefault();
        const dialogResp: boolean = await this.dialogService.confirm(
            "Delete record",
            "Are you sure you want to proceed?",
            "Delete"
        );
        if (dialogResp) {
            this.deleteEvent.emit(row);
        }
    }

    onCheckboxChange(row: T): void {
        const updatedRow = { ...row, checked: !row.checked };
        this.updateEvent.emit(updatedRow);
    }
}
