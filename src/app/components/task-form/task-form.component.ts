import { Component, inject } from "@angular/core";
import {
    FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Task } from "../../interfaces/task.interfaces";
import { NotificationService } from "../../services/notification.service";
import { TaskService } from "../../services/task.service";

@Component({
    selector: "app-task-form",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
    templateUrl: "./task-form.component.html",
    styleUrls: ["./task-form.component.scss"]
})
export class TaskFormComponent {
    loading: boolean = false;
    readonly data = inject<{ isEdit: boolean; row?: Task }>(MAT_DIALOG_DATA);
    readonly isEdit: boolean = this.data.isEdit;
    readonly task: Task | undefined = this.data.row;
    readonly title: string = this.isEdit ? "Edit Task" : "Create Task";

    readonly form: FormGroup = new FormGroup({
        title: new FormControl(this.task?.title || "", [Validators.required]),
        description: new FormControl(this.task?.description || "", [Validators.required]),
    });

    private readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
    private readonly taskService = inject(TaskService);
    private readonly notification = inject(NotificationService);

    onSubmit(e: Event): void {
        e.preventDefault();
        this.loading = true;
        if (this.form.valid) {
            const task: Task = {
                ...this.task,
                ...this.form.value,
                created: this.isEdit ? this.task?.created : new Date().toISOString(),
                checked: this.isEdit ? this.task?.checked : false,
            } as Task;

            this.taskService[this.isEdit ? "updateTask" : "createTask"](task).then(() => {
                this.notification.success(this.isEdit ? "Task updated successfully" : "Task created successfully");
                this.dialogRef.close(true);
                this.loading = false;
            }).catch(() => {
                this.notification.error(this.isEdit ? "Error updating task" : "Error creating task");
                this.dialogRef.close(false);
                this.loading = false;
            });
        }
    }
}
