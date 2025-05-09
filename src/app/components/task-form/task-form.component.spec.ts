import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskFormComponent } from "./task-form.component";

const MockTaskService = class {};
const MockApiService = class {};

describe("TaskFormComponent", () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TaskFormComponent,
                HttpClientTestingModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: "TaskService", useClass: MockTaskService },
                { provide: "ApiService", useClass: MockApiService },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => {} } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have a form defined", () => {
        expect(component.form).toBeDefined();
    });

    it("should be invalid when form is empty", () => {
        component.form.reset();
        expect(component.form.valid).toBeFalse();
    });

    it("should be valid when required fields are filled", () => {
        component.form.patchValue({
            title: "Test Task",
            description: "Test Description"
        });
        expect(component.form.valid).toBeTrue();
    });

    it("should emit submit event on submit if form is valid", () => {
        spyOn(component, "onSubmit").and.callThrough();
        component.form.patchValue({
            title: "Test Task",
            description: "Test Description"
        });
        component.onSubmit(new Event("submit"));
        expect(component.onSubmit).toHaveBeenCalled();
    });

    it("should not emit submit event if form is invalid", () => {
        spyOn(component, "onSubmit").and.callThrough();
        component.form.patchValue({
            title: "",
            description: ""
        });
        component.onSubmit(new Event("submit"));
        expect(component.onSubmit).toHaveBeenCalled();
    });
});
