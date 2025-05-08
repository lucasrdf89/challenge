import { CommonModule } from "@angular/common";
import {
    Component, inject, OnDestroy, OnInit
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Subject } from "rxjs";

import { TableComponent } from "../../components/table/table.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { ToolbarComponent } from "../../components/templates/toolbar/toolbar.component";
import { Task } from "../../interfaces/task.interfaces";
import { NotificationService } from "../../services/notification.service";
import { TaskService } from "../../services/task.service";

@Component({
    selector: "app-tasks",
    standalone: true,
    imports: [TableComponent, ToolbarComponent, CommonModule, MatProgressSpinnerModule],
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit, OnDestroy {
    readonly cols: string[] = ["title", "description", "created"];
    loading: boolean = true;
    tasks: Task[] = [];

    private readonly destroy$ = new Subject<void>();
    private readonly dialog = inject(MatDialog);
    private readonly taskService = inject(TaskService);
    private readonly notification = inject(NotificationService);

    async ngOnInit(): Promise<void> {
        this.reloadTasks();
    }

    private async reloadTasks(): Promise<void> {
        this.tasks = await this.taskService.getTasks();
        this.loading = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openDialog(event: { isEdit: boolean; row?: Task }): void {
        this.dialog.open(TaskFormComponent, {
            data: {
                isEdit: event.isEdit,
                row: event.row ?? null
            }
        }).afterClosed().subscribe((result: boolean) => {
            if (result) { this.reloadTasks(); }
        });
    }

    async updateTask(updatedTask: Task): Promise<void> {
        const resp: boolean = await this.taskService.updateTask(updatedTask);
        this.notification[resp ? "success" : "error"](resp ? "Task updated successfully" : "Error updating task");
    }

    async deleteTask(task: Task): Promise<void> {
        const resp: boolean = await this.taskService.deleteTask(task);
        if (resp) {
            this.tasks = this.tasks.filter((t: Task) => t !== task);
            this.notification.success("Task deleted successfully");
        } else {
            this.notification.error("Error deleting task");
        }
    }
}
