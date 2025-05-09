import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TasksComponent } from "./tasks.component";


const mockTaskService = {};
const mockApiService = {};

describe("TasksComponent", () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TasksComponent,
                HttpClientTestingModule
            ],
            providers: [
                { provide: "TaskService", useValue: mockTaskService },
                { provide: "ApiService", useValue: mockApiService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
