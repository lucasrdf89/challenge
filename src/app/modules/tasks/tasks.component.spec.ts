import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TasksComponent } from "./tasks.component";

class MockTaskService {}
class MockApiService {}

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
                { provide: 'TaskService', useClass: MockTaskService },
                { provide: 'ApiService', useClass: MockApiService }
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
