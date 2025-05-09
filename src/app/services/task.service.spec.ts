import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service";
import { ApiService } from "./api.service";
import { Task } from "../interfaces/task.interfaces";

class MockApiService {
    get = jasmine.createSpy().and.returnValue(Promise.resolve({
        status: 1,
        data: {
            resp: [{
                id: "1",
                title: "Task 1",
                description: "",
                created: 1746754138250,
                checked: false,
                user: "1"
            }]
        }
    }));
    post = jasmine.createSpy().and.returnValue(Promise.resolve({ status: true }));
    put = jasmine.createSpy().and.returnValue(Promise.resolve({ status: true }));
    delete = jasmine.createSpy().and.returnValue(Promise.resolve({ status: true }));
}

describe("TaskService", () => {
    let service: TaskService;
    let apiService: MockApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useClass: MockApiService }
            ]
        });
        service = TestBed.inject(TaskService);
        apiService = TestBed.inject(ApiService) as any;
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should get tasks", async () => {
        const tasks = await service.getTasks();
        expect(apiService.get).toHaveBeenCalledWith("task");
        expect(tasks).toEqual([{
            id: "1",
            title: "Task 1",
            description: "",
            created: 1746754138250,
            checked: false,
            user: "1"
        }]);
    });

    it("should create a task", async () => {
        const task: Task = { id: 2, name: "New Task" } as any;
        const result = await service.createTask(task);
        expect(apiService.post).toHaveBeenCalledWith("task", task);
        expect(result).toBeTrue();
    });

    it("should update a task", async () => {
        const task: Task = { id: 1, name: "Updated Task" } as any;
        const result = await service.updateTask(task);
        expect(apiService.put).toHaveBeenCalledWith("task/1", task);
        expect(result).toBeTrue();
    });

    it("should delete a task", async () => {
        const task: Task = { id: 1, name: "Task 1" } as any;
        const result = await service.deleteTask(task);
        expect(apiService.delete).toHaveBeenCalledWith("task/1");
        expect(result).toBeTrue();
    });
});
