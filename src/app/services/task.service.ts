import { inject, Injectable } from "@angular/core";

import { Task } from "../interfaces/task.interfaces";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private readonly apiService: ApiService = inject(ApiService);

    private readonly collectionPath: string = "task";

    async getTasks() {
        const response = await this.apiService.get<{ status: number, resp: Task[] }>(this.collectionPath);
        return response.status ? response.data.resp : [];
    }

    async createTask(task: Task): Promise<boolean> {
        const response = await this.apiService.post<Task>(this.collectionPath, task);
        return response.status;
    }

    async updateTask(task: Task): Promise<boolean> {
        const response = await this.apiService.put<Task>(`${this.collectionPath}/${task.id}`, task);
        return response.status;
    }

    async deleteTask(task: Task): Promise<boolean> {
        const response = await this.apiService.delete<Task>(`${this.collectionPath}/${task.id}`);
        return response.status;
    }
}
